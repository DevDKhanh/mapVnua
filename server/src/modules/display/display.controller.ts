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
import { CreateDisplayDto } from './dto/post.dto';
import { UpdateDisplayDto } from './dto/put.dto';
import { DisplayService } from './display.service';
import {
  PermisionCreateGuard,
  PermisionDeleteGuard,
  PermisionEditGuard,
} from '../auth/jwt.strategy';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Display API')
@ApiConsumes('Display Api')
@Controller('display')
export class DisplayController {
  constructor(private readonly displayService: DisplayService) {}

  @Post()
  @UseGuards(PermisionCreateGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Create display new . Admin' })
  @ApiOkResponse({ type: CreateDisplayDto, status: 201 })
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() createDisplayDto: CreateDisplayDto) {
    return this.displayService.create(createDisplayDto);
  }

  @Put('/:id')
  @UseGuards(PermisionEditGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Update Display . Admin' })
  @ApiOkResponse({ type: UpdateDisplayDto, status: 200 })
  async update(
    @Param('id') id: number,
    @Body() updateDisplayDto: UpdateDisplayDto,
  ) {
    return this.displayService.update(id, updateDisplayDto);
  }

  @Get('/')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get list Display . Public' })
  @ApiOkResponse({ type: CreateDisplayDto, status: 200 })
  async getList(@Query() getListDto: GetListDto) {
    return this.displayService.getList(getListDto);
  }

  @Get('/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get detail Display . Public' })
  @ApiOkResponse({ type: CreateDisplayDto, status: 200 })
  async getDetail(@Param() id: string) {
    return this.displayService.getDetail(id);
  }

  @Delete('/:id')
  @UseGuards(PermisionDeleteGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete one Display . Admin' })
  @ApiOkResponse({ type: CreateDisplayDto, status: 200 })
  async delete(@Param() id: string) {
    return this.displayService.delete(id);
  }
}
