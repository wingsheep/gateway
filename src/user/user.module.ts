import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/common/database/database.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { WorkWechatController } from './work_wechat/work_wechat.controller';
import { WorkWechatService } from './work_wechat/work_wechat.service';
import { OpenaiService } from './openai/openai.service';
import { OpenaiController } from './openai/openai.controller';
import { UserProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, WorkWechatController, OpenaiController],
  providers: [...UserProviders, UserService, WorkWechatService, OpenaiService],
  exports: [UserService],
})
export class UserModule {}
