import { Injectable } from '@nestjs/common';
import { CreateMapBaseDto } from './dto/create-map-base.dto';
import { UpdateMapBaseDto } from './dto/update-map-base.dto';

@Injectable()
export class MapBaseService {
  create(createMapBaseDto: CreateMapBaseDto) {
    return 'This action adds a new mapBase';
  }

  findAll() {
    return `This action returns all mapBase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mapBase`;
  }

  update(id: number, updateMapBaseDto: UpdateMapBaseDto) {
    return `This action updates a #${id} mapBase`;
  }

  remove(id: number) {
    return `This action removes a #${id} mapBase`;
  }
}
