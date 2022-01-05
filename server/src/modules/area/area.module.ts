import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';
import { AreaEntity } from './entities/area.entity';
import { LanguageEntity } from '../language/entities/language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AreaEntity, LanguageEntity])],
  controllers: [AreaController],
  providers: [AreaService],
})
export class AreaModule {}
