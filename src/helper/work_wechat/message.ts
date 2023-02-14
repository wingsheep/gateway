import { methodV } from 'src/utils/request';

export enum MSG_TYPE {
  text,
  image,
  voice,
  video,
  file,
  textcard,
  news,
  mpnews,
  markdown,
}

export type SAFE_TYPE = 0 | 1;

export type MESSAGES_PARAMS = {
  chatid: string;
  media_id: string;
  content: string;
  msgtype: MSG_TYPE;
  safe: SAFE_TYPE;
};

export const messages = async (
  params: MESSAGES_PARAMS,
  access_token: string,
) => {
  console.log(params, access_token);

  const { data } = await methodV({
    url: `/appchat/send`,
    method: 'POST',
    query: { access_token },
    params,
  });
  return data;
};

export const messagesByRobot = async (params: MESSAGES_PARAMS, key: string) => {
  const { data } = await methodV({
    url: `/webhook/send`,
    method: 'POST',
    query: {
      key,
    },
    params,
  });
  return data;
};
