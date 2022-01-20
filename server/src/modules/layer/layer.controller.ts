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
import { LayerService } from './layer.service';
import { CreateLayerDto } from './dto/post.dto';
import { UpdateLayerDto } from './dto/put.dto';
import { GetListDto } from 'src/common/dto/index.dto';

@ApiTags('Layer API')
@ApiConsumes('Layer Api')
@Controller('layer')
export class LayerController {
  constructor(private readonly layerService: LayerService) {}

  @Post('/')
  @UseGuards(AdminAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Create Layer new . Admin' })
  @ApiOkResponse({ type: CreateLayerDto, status: 201 })
  async create(@Body() createLayerDto: CreateLayerDto) {
    return this.layerService.create(createLayerDto);
  }

  @Put('/:id')
  @UseGuards(AdminAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Update Layer . Admin' })
  @ApiOkResponse({ type: UpdateLayerDto, status: 200 })
  async update(
    @Param('id') id: string,
    @Body() updateLayerDto: UpdateLayerDto,
  ) {
    return this.layerService.update(id, updateLayerDto);
  }

  @Get('/')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get list Layer . Public' })
  @ApiOkResponse({ type: CreateLayerDto, status: 200 })
  async getList(@Query() getListDto: GetListDto) {
    return this.layerService.getList(getListDto);
  }

  @Get('/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get detail Layer . Public' })
  @ApiOkResponse({ type: CreateLayerDto, status: 200 })
  async getDetail(@Param() id: string) {
    return this.layerService.getDetail(id);
  }

  @Delete('/:id')
  @UseGuards(AdminAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete one Layer . Admin' })
  @ApiOkResponse({ type: CreateLayerDto, status: 200 })
  async delete(@Param() id: string) {
    return this.layerService.delete(id);
  }
}