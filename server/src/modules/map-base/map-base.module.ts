import { MapBaseController } from './map-base.controller';
import { MapBaseService } from './map-base.service';
import { MapSettingEntity } from '../setting/entities/setting.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MapSettingEntity])],
  controllers: [MapBaseController],
  providers: [MapBaseService],
})
export class MapBaseModule {}
