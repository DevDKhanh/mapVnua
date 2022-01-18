import { LayerEntity } from './../layer/entities/layer.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassifyController } from './classify.controller';
import { ClassifyService } from './classify.service';
import { ClassifyEntity } from './entities/classify.entity';
import { LanguageEntity } from '../language/entities/language.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClassifyEntity, LanguageEntity, LayerEntity]),
  ],
  controllers: [ClassifyController],
  providers: [ClassifyService],
})
export class ClassifyModule {}
