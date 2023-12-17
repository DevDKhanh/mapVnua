import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { MapBaseService } from './map-base.service';
import { CreateMapBaseDto } from './dto/create-map-base.dto';
import { UpdateMapBaseDto } from './dto/update-map-base.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  PermisionCreateGuard,
  PermisionDeleteGuard,
  PermisionEditGuard,
} from '../auth/jwt.strategy';
import { GetListDto } from 'src/common/dto/index.dto';

@ApiTags('Map base API')
@Controller('map')
export class MapBaseController {
  constructor(private readonly mapBaseService: MapBaseService) {}

  @Post()
  @UseGuards(PermisionCreateGuard)
  create(@Body() createMapBaseDto: CreateMapBaseDto) {
    return this.mapBaseService.create(createMapBaseDto);
  }

  @Get()
  findAll(@Query() getListDto: GetListDto) {
    return this.mapBaseService.findAll(getListDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mapBaseService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(PermisionEditGuard)
  update(@Param('id') id: string, @Body() updateMapBaseDto: UpdateMapBaseDto) {
    return this.mapBaseService.update(+id, updateMapBaseDto);
  }

  @Delete(':id')
  @UseGuards(PermisionDeleteGuard)
  remove(@Param('id') id: string) {
    return this.mapBaseService.remove(+id);
  }
}
