import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AdminAuthGuard } from '../auth/jwt.strategy';
import { SettingService } from './setting.service';
import { CreateSettingDto } from './dto/post.dto';
import { UpdateSettingDto } from './dto/put.dto';
import { GetListDto } from 'src/common/dto/index.dto';

@ApiTags('Setting API')
@ApiConsumes('Setting Api')
@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Post('/')
  @UseGuards(AdminAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Create setting new . Admin' })
  @ApiOkResponse({ type: CreateSettingDto, status: 201 })
  async create(@Body() createSettingDto: CreateSettingDto) {
    return this.settingService.create(createSettingDto);
  }

  @Put('/:id')
  @UseGuards(AdminAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Update setting . Admin' })
  @ApiOkResponse({ type: UpdateSettingDto, status: 201 })
  async update(
    @Param('id') id: number,
    @Body() updateSettingDto: UpdateSettingDto,
  ) {
    return this.settingService.update(id, updateSettingDto);
  }

  @Get('/')
  @UseGuards(AdminAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Get list setting . Admin' })
  @ApiOkResponse({ type: CreateSettingDto, status: 200 })
  async getList(@Query() getListDto: GetListDto) {
    return this.settingService.getList(getListDto);
  }

  @Get('/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get detail setting . Admin' })
  @ApiOkResponse({ type: CreateSettingDto, status: 200 })
  async getDetail(@Param() id: number) {
    return this.settingService.getDetail(id);
  }

  @Delete('/:id')
  @UseGuards(AdminAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete one setting . Admin' })
  @ApiOkResponse({ type: CreateSettingDto, status: 200 })
  async delete(@Param() id: number) {
    return this.settingService.delete(id);
  }
}
