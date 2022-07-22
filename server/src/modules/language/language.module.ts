import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';
import { LanguageEntity } from './entities/language.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LanguageEntity]),
    HttpModule.register({
      timeout: 15000,
      maxRedirects: 5,
    }),
  ],
  controllers: [LanguageController],
  providers: [LanguageService],
})
export class LanguageModule {}
