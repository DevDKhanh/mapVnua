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

import { GetListDto } from 'src/common/dto/index.dto';
import { CreateLanguageDto } from './dto/post.dto';
import { UpdateLanguageDto } from './dto/put.dto';
import { LanguageService } from './language.service';
import { AdminAuthGuard } from '../auth/jwt.strategy';

@ApiTags('Language API')
@ApiConsumes('Language Api')
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post('/')
  @UseGuards(AdminAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Create language new . Admin' })
  @ApiOkResponse({ type: CreateLanguageDto, status: 201 })
  async create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languageService.create(createLanguageDto);
  }

  @Put('/:id')
  @UseGuards(AdminAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Update language . Admin' })
  @ApiOkResponse({ type: CreateLanguageDto, status: 200 })
  async update(
    @Param('id') id: string,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ) {
    return this.languageService.update(id, updateLanguageDto);
  }

  @Get('/')
  @UseGuards(AdminAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Get list language . Admin' })
  @ApiOkResponse({ type: CreateLanguageDto, status: 200 })
  async getList(@Query() getListDto: GetListDto) {
    return this.languageService.getList(getListDto);
  }

  @Get('/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get detail language . Public' })
  @ApiOkResponse({ type: CreateLanguageDto, status: 200 })
  async getDetail(@Param('id') id: string) {
    return this.languageService.getDetail(id);
  }

  @Delete('/:id')
  @UseGuards(AdminAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Get detail language . Public' })
  @ApiOkResponse({ type: CreateLanguageDto, status: 200 })
  async delete(@Param('id') id: string) {
    return this.languageService.delete(id);
  }
}
