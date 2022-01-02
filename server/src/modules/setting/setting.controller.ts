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
  Param,
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
import { UpdateSettingDto } from './dto/put.dto';
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

  @Get('/active/')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get one setting . User' })
  @ApiOkResponse({ type: CreateSettingDto, status: 200 })
  async getSettingActive() {
    return this.settingService.getSettingActive();
  }

  @Get('/:id')
  @UseGuards(AdminAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Get one setting . Admin' })
  @ApiOkResponse({ type: CreateSettingDto, status: 200 })
  async getOne(@Param() id: number) {
    return this.settingService.getOne(id);
  }

  @Put('/:id')
  @UseGuards(AdminAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Update one setting . Admin' })
  @ApiOkResponse({ type: CreateSettingDto, status: 200 })
  async updateOne(
    @Param('id') id: number,
    @Body() updateSettingDto: UpdateSettingDto,
  ) {
    return this.settingService.updateOne(id, updateSettingDto);
  }

  @Delete('/:id')
  @UseGuards(AdminAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete one setting . Admin' })
  @ApiOkResponse({ type: CreateSettingDto, status: 200 })
  async deleteOne(@Param('id') id: number) {
    return this.settingService.deleteOne(id);
  }
}
