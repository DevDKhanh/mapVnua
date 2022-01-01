import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Query,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { SettingService } from './setting.service';
import { CreateSettingDto } from './dto/post.dto';
import { GetListSettingDto } from './dto/get.dto';
import { AdminAuthGuard } from '../auth/jwt.strategy';

@ApiTags('Setting API')
@ApiConsumes('Setting Api')
@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}
  @Post('/')
  @UseGuards(AdminAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Create setting new . Admin' })
  @ApiOkResponse({ type: CreateSettingDto, status: 200 })
  async create(@Body() createSettingDto: CreateSettingDto) {
    return this.settingService.create(createSettingDto);
  }

  @Get('/')
  @UseGuards(AdminAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'All list setting . Admin' })
  @ApiOkResponse({ type: CreateSettingDto, status: 200 })
  async getAll(@Query() getListSettingDto: GetListSettingDto) {
    return this.settingService.gettAll(getListSettingDto);
  }
}
