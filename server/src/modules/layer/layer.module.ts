import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LayerController } from './layer.controller';
import { LayerService } from './layer.service';
import { LayerEntity } from './entities/layer.entity';
import { ClassifyEntity } from './../classify/entities/classify.entity';
import { LanguageEntity } from '../language/entities/language.entity';
import { AreaEntity } from '../area/entities/area.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LayerEntity,
      LanguageEntity,
      AreaEntity,
      ClassifyEntity,
    ]),
  ],
  controllers: [LayerController],
  providers: [LayerService],
})
export class LayerModule {}
