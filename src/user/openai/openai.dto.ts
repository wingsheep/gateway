import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';

export class OpenaiTextDto {
  @IsNotEmpty()
  @ApiProperty({
    example:
      '我在2022年2月20号从江苏省苏州市腾飞创新园开车到江苏省常州市武进区某小区送钢材给客户张三支出了100元挣了200元',
  })
  section: string;
}

export class OpenaiAudioDto {
  @IsNotEmpty()
  @ApiProperty({
    example:
      'https://test-nas-1254176987.cos.ap-shanghai.myqcloud.com/VEHICLE_USER_AUTH_VEHICLE_WECHAT_MP/vehicle-license/16bf48ab1e9f6c9d513d7cefdad7a29f',
  })
  url: string;
}
