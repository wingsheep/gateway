import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/common/database/database.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { WorkWechatController } from './work_wechat/work_wechat.controller';
import { WorkWechatService } from './work_wechat/work_wechat.service';
import { UserProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, WorkWechatController],
  providers: [...UserProviders, UserService, WorkWechatService],
  exports: [UserService],
})
export class UserModule {}
