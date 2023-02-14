import { CORP_ID, CORP_SECRET } from './const';
import { methodV } from 'src/utils/request';

export type GetAppTokenRes = {
  errcode: number;
  errmsg: string;
  access_token: string;
  expires_in: number;
};

export const getAppToken = async () => {
  const { data } = await methodV({
    url: `/gettoken`,
    method: 'GET',
    params: {
      CORP_ID: CORP_ID,
      CORP_SECRET: CORP_SECRET,
    },
  });
  return data as GetAppTokenRes;
};
