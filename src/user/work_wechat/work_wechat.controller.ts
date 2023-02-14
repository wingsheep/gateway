import {
  Body,
  Controller,
  Post,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WorkWechatService } from './work_wechat.service';
import {
  WorkWechatMessageDto,
  WorkWechatMessageByRobotDto,
} from './work_wechat.dto';

@ApiTags('企业微信')
@Controller('work_wechat')
export class WorkWechatController {
  constructor(private readonly workWechatService: WorkWechatService) {}

  @ApiOperation({
    summary: '消息推送',
  })
  @Version([VERSION_NEUTRAL])
  @Post('sendMessage')
  sendMessage(@Body() params: WorkWechatMessageDto) {
    return this.workWechatService.sendMessage(params);
  }

  @ApiOperation({
    summary: '机器人消息推送',
  })
  @Version([VERSION_NEUTRAL])
  @Post('sendMessageByRobot')
  sendMessageByRobot(@Body() params: WorkWechatMessageByRobotDto) {
    return this.workWechatService.sendMessageByRobot(params);
  }
}
