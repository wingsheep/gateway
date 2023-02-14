import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import {
  getAppToken,
  // getUserAccessToken,
  // getUserToken,
  // refreshUserToken,
} from 'src/helper/work_wechat/auth';
import type { Cache } from 'cache-manager';
import { BusinessException } from '@/common/exceptions/business.exception';
import { ConfigService } from '@nestjs/config';
import { messages, messagesByRobot } from '@/helper/work_wechat/message';

@Injectable()
export class WorkWechatService {
  private APP_TOKEN_CACHE_KEY;
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {
    this.APP_TOKEN_CACHE_KEY = this.configService.get('APP_TOKEN_CACHE_KEY');
  }

  async getAppToken() {
    let appToken: string;
    console.log('before', this.APP_TOKEN_CACHE_KEY, appToken);
    appToken = await this.cacheManager.get(this.APP_TOKEN_CACHE_KEY);
    console.log('after', this.APP_TOKEN_CACHE_KEY, appToken);
    if (!appToken) {
      const response = await getAppToken();
      if (response.errcode === 0) {
        // token 有效期为 2 小时，在此期间调用该接口 token 不会改变。当 token 有效期小于 30 分的时候,再次请求获取 token 的时候，会生成一个新的 token，与此同时老的 token 依然有效。
        appToken = response.access_token;
        this.cacheManager.set(this.APP_TOKEN_CACHE_KEY, appToken, {
          ttl: response.expires_in - 60,
        } as any);
      } else {
        throw new BusinessException('企业微信调用异常');
      }
    }
    return appToken;
  }

  async sendMessage(params) {
    const app_token = await this.getAppToken();
    return messages(params, app_token as string);
  }
  // 通过机器人发送消息
  sendMessageByRobot(params) {
    const key = 'c7693a83-76cd-421f-8745-cfe0bfed6b15';
    return messagesByRobot(params, key as string);
  }
}
