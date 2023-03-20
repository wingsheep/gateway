import { Configuration, OpenAIApi } from 'openai';
import { getConfig } from '@/utils';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
import { v4 } from 'uuid';
const { OPENAI_API_KEY } = getConfig();

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const requestPrompt = async function (params) {
  if (!configuration.apiKey) {
    return 'OpenAI API key not configured, please follow instructions in README.md';
  }

  try {
    console.log(generatePrompt(params));
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(params),
      temperature: 0,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(completion);

    return JSON.parse(completion.data.choices[0].text);
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return error;
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return 'An error occurred during your request.';
    }
  }
};

export const requestTransformAudio = async function (file) {
  const filterType: string[] = ['image', 'video', 'audio'];
  const { mimetype } = file;
  // 判断当前上传至接口的文件类型是否在白名单中，如果在则允许上传，不在则返回错误信息
  if (filterType.findIndex((f: string) => mimetype.includes(f)) < 0) {
    return {
      result: -1,
      errMessage: '文件格式错误，仅支持上传图片、动图或视频',
      success: false,
    };
  }

  // // 使用uuid作为文件名称，并且保留文件后缀
  const newName = `${v4()}.${file.fieldname.split('.')[1]}`;
  // 将文件写入本地
  const buffer = await file.toBuffer(); // Buffer

  await fs.writeFileSync(newName, buffer);
  // 使用本地文件生成ReadStream
  const newFile: any = await fs.createReadStream(
    '3a01585f-7eb6-4337-ae0d-092f628ac22e.mp3',
  );
  const resp: any = await openai.createTranscription(
    newFile,
    'whisper-1',
    '普通话',
    'text',
  );
  fs.unlinkSync(newName);
  console.log(resp.data);
  return resp.data;
};

function generatePrompt(section) {
  return `将以下这段话“${section}”识别拆分为以下起始点省市区(startArea)，起始地具体地址(startAddress), 目的地具体地址(endAddress)，目的地省市区(endArea)，支出(expense)(格式为数字保留两位小数)，收入(income)(格式为数字保留两位小数)，客户(customer)，时间(date)(格式为YYYY-MM-DD)，货物（goods），并以json的格式给我：
  `;
}
