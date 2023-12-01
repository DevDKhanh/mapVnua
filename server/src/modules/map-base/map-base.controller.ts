import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MapBaseService } from './map-base.service';
import { CreateMapBaseDto } from './dto/create-map-base.dto';
import { UpdateMapBaseDto } from './dto/update-map-base.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Map base API')
@Controller('map-base')
export class MapBaseController {
  constructor(private readonly mapBaseService: MapBaseService) {}

  @Post()
  create(@Body() createMapBaseDto: CreateMapBaseDto) {
    return this.mapBaseService.create(createMapBaseDto);
  }

  @Get()
  findAll() {
    return this.mapBaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mapBaseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMapBaseDto: UpdateMapBaseDto) {
    return this.mapBaseService.update(+id, updateMapBaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mapBaseService.remove(+id);
  }
}
