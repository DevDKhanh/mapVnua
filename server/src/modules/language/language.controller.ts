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
  UseInterceptors,
  UploadedFile,
  Headers,
} from '@nestjs/common';
import {
  ApiTags,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { GetListDto } from '../../common/dto/index.dto';
import { CreateLanguageDto } from './dto/post.dto';
import { UpdateLanguageDto } from './dto/put.dto';
import { LanguageService } from './language.service';
import {
  PermisionCreateGuard,
  PermisionDeleteGuard,
  PermisionEditGuard,
} from '../auth/jwt.strategy';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Language API')
@ApiConsumes('Language Api')
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  @UseGuards(PermisionCreateGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Create language new . Admin' })
  @ApiOkResponse({ type: CreateLanguageDto, status: 201 })
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createLanguageDto: CreateLanguageDto,
    @UploadedFile() file: Express.Multer.File,
    @Headers() header: any,
  ) {
    return this.languageService.create(createLanguageDto, file, header);
  }

  @Put('/:id')
  @UseGuards(PermisionEditGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Update language . Admin' })
  @ApiOkResponse({ type: CreateLanguageDto, status: 200 })
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updateLanguageDto: UpdateLanguageDto,
    @UploadedFile() file: any,
  ) {
    return this.languageService.update(id, updateLanguageDto);
  }

  @Get('/')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get list language . Public' })
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
  @UseGuards(PermisionDeleteGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Get detail language . Admin' })
  @ApiOkResponse({ type: CreateLanguageDto, status: 200 })
  async delete(@Param('id') id: string) {
    return this.languageService.delete(id);
  }
}
