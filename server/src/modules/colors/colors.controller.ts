import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { ColorsService } from './colors.service';
import { CreateColorDto, SearchColorsDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  PermisionCreateGuard,
  PermisionDeleteGuard,
  PermisionEditGuard,
} from '../auth/jwt.strategy';
import { GetListDto } from 'src/common/dto/index.dto';

@ApiTags('Color API')
@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Post()
  @UseGuards(PermisionCreateGuard)
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorsService.create(createColorDto);
  }

  @Get()
  findAll(@Query() getListDto: GetListDto) {
    return this.colorsService.findAll(getListDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colorsService.findOne(+id);
  }

  @Post('/search-colors')
  searchColors(@Body() body: SearchColorsDto) {
    return this.colorsService.searchColors(body);
  }

  @Put(':id')
  @UseGuards(PermisionEditGuard)
  update(@Param('id') id: string, @Body() updateColorDto: UpdateColorDto) {
    return this.colorsService.update(+id, updateColorDto);
  }

  @Delete(':id')
  @UseGuards(PermisionDeleteGuard)
  remove(@Param('id') id: string) {
    return this.colorsService.remove(+id);
  }
}
