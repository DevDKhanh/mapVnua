import { Module } from '@nestjs/common';
import { MapBaseService } from './map-base.service';
import { MapBaseController } from './map-base.controller';

@Module({
  controllers: [MapBaseController],
  providers: [MapBaseService]
})
export class MapBaseModule {}
