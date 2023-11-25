import { MapSettingEntity, SettingEntity } from './entities/setting.entity';

import { LanguageEntity } from '../language/entities/language.entity';
import { Module } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([SettingEntity, LanguageEntity, MapSettingEntity]),
  ],
  controllers: [SettingController],
  providers: [SettingService],
})
export class SettingModule {}
