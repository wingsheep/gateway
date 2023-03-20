import {
  Injectable,
  Logger,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { requestPrompt, requestTransformAudio } from '@/helper/openai/prompt';
import fastify = require('fastify');
import * as util from 'util';
import * as fs from 'fs';
import stream = require('stream');

@Injectable()
export class OpenaiService {
  // openai prompt
  generatePrompt(params) {
    return requestPrompt(params.section);
  }

  transformAudio(params) {
    return requestTransformAudio(params.url);
  }
  // upload file
  async uploadFile(req: any, res: fastify.FastifyReply<any>): Promise<any> {
    const file = await req.file();
    const text = await requestTransformAudio(file);
    const fields = await this.generatePrompt({
      section: text,
    });
    res.send({ text, fields });

    return { text, fields };
  }
}
