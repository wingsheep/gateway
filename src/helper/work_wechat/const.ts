/*
 * @Author: flySheep
 * @Description: 企业微信环境变量
 */

import { getConfig } from '@/utils';

const { WORK_WECHAT_CONFIG } = getConfig();

export const CORP_ID = WORK_WECHAT_CONFIG.WORK_WECHAT_CORP_ID;
export const CORP_SECRET = WORK_WECHAT_CONFIG.WORK_WECHAT_CORP_SECRET;
