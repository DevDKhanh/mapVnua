import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DisplayController } from './display.controller';
import { DisplayService } from './display.service';
import { DisplayEntity } from './entities/display.entity';
import { LanguageEntity } from '../language/entities/language.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DisplayEntity, LanguageEntity]),
    HttpModule.register({
      timeout: 15000,
      maxRedirects: 5,
    }),
  ],
  controllers: [DisplayController],
  providers: [DisplayService],
})
export class DisplayModule {}
