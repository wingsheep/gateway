import { MESSAGES_PARAMS, MSG_TYPE } from '@/helper/work_wechat/message';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';

export class WorkWechatMessageDto {
  @ApiProperty({
    example: {
      chatid: 'CHATID',
      msgtype: 'text',
      text: {
        content: '你的快递已到\n请携带工卡前往邮件中心领取',
      },
      safe: 0,
    },
  })
  params?: MESSAGES_PARAMS;
}

export class WorkWechatMessageByRobotDto {
  @IsNotEmpty()
  @IsEnum(MSG_TYPE)
  @ApiProperty({ example: 'text', enum: MSG_TYPE })
  msgtype: MSG_TYPE;

  @IsNotEmpty()
  @ApiProperty({ example: { content: 'test content' } })
  text?: string;
}
