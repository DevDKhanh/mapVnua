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

import {
  PermisionCreateGuard,
  PermisionDeleteGuard,
  PermisionEditGuard,
} from '../auth/jwt.strategy';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/post.dto';
import { UpdateAreaDto } from './dto/put.dto';
import { GetListDto } from 'src/common/dto/index.dto';

@ApiTags('Area API')
@ApiConsumes('Area Api')
@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post('/')
  @UseGuards(PermisionCreateGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Create Area new . Admin' })
  @ApiOkResponse({ type: CreateAreaDto, status: 201 })
  async create(@Body() createAreaDto: CreateAreaDto) {
    return this.areaService.create(createAreaDto);
  }

  @Put('/:id')
  @UseGuards(PermisionEditGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Update Area . Admin' })
  @ApiOkResponse({ type: UpdateAreaDto, status: 200 })
  async update(@Param('id') id: string, @Body() updateAreaDto: UpdateAreaDto) {
    return this.areaService.update(id, updateAreaDto);
  }

  @Get('/')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get list Area . Public' })
  @ApiOkResponse({ type: CreateAreaDto, status: 200 })
  async getList(@Query() getListDto: GetListDto) {
    return this.areaService.getList(getListDto);
  }

  @Get('/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get detail Area . Public' })
  @ApiOkResponse({ type: CreateAreaDto, status: 200 })
  async getDetail(@Param() id: string) {
    return this.areaService.getDetail(id);
  }

  @Delete('/:id')
  @UseGuards(PermisionDeleteGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete one Area . Admin' })
  @ApiOkResponse({ type: CreateAreaDto, status: 200 })
  async delete(@Param() id: string) {
    return this.areaService.delete(id);
  }
}
