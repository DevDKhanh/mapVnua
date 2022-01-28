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
  AdminAuthGuard,
  PermisionCreateGuard,
  PermisionDeleteGuard,
  PermisionEditGuard,
} from '../auth/jwt.strategy';
import { ClassifyService } from './classify.service';
import { CreateClassifyDto } from './dto/post.dto';
import { UpdateClassifyDto } from './dto/put.dto';
import { GetListDto } from 'src/common/dto/index.dto';

@ApiTags('Classify API')
@ApiConsumes('Classify Api')
@Controller('classify')
export class ClassifyController {
  constructor(private readonly classifyService: ClassifyService) {}

  @Post('/')
  @UseGuards(PermisionCreateGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Create Classify new . Admin' })
  @ApiOkResponse({ type: CreateClassifyDto, status: 201 })
  async create(@Body() createClassifyDto: CreateClassifyDto) {
    return this.classifyService.create(createClassifyDto);
  }

  @Put('/:id')
  @UseGuards(PermisionEditGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Update Classify . Admin' })
  @ApiOkResponse({ type: UpdateClassifyDto, status: 200 })
  async update(
    @Param('id') id: string,
    @Body() updateClassifyDto: UpdateClassifyDto,
  ) {
    return this.classifyService.update(id, updateClassifyDto);
  }

  @Get('/')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get list Classify . Public' })
  @ApiOkResponse({ type: CreateClassifyDto, status: 200 })
  async getList(@Query() getListDto: GetListDto) {
    return this.classifyService.getList(getListDto);
  }

  @Get('/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get detail Classify . Public' })
  @ApiOkResponse({ type: CreateClassifyDto, status: 200 })
  async getDetail(@Param() id: string) {
    return this.classifyService.getDetail(id);
  }

  @Delete('/:id')
  @UseGuards(PermisionDeleteGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete one Classify . Admin' })
  @ApiOkResponse({ type: CreateClassifyDto, status: 200 })
  async delete(@Param() id: string) {
    return this.classifyService.delete(id);
  }
}
