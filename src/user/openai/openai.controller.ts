import {
  Body,
  Controller,
  Post,
  Get,
  Version,
  VERSION_NEUTRAL,
  Query,
  UploadedFile,
  UseInterceptors,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OpenaiService } from './openai.service';
import { OpenaiTextDto, OpenaiAudioDto } from './openai.dto';
import { v4 } from 'uuid';
import * as fs from 'fs';

@ApiTags('OpenAi')
@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @ApiOperation({
    summary: 'openai',
  })
  @Version([VERSION_NEUTRAL])
  @Post('generatePrompt')
  generatePrompt(@Body() params: OpenaiTextDto) {
    return this.openaiService.generatePrompt(params);
  }

  @ApiOperation({
    summary: 'openai',
  })
  @Version([VERSION_NEUTRAL])
  @Post('transformAudio')
  transformAudio(@Body() params) {
    return this.openaiService.transformAudio(params);
  }

  @Post('/upload')
  public async uploadFileUsingPOST(@Req() req, @Res() res) {
    return await this.openaiService.uploadFile(req, res);
  }
}
