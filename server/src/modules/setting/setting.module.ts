import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { SettingEntity } from './entities/setting.entity';
import { LanguageEntity } from '../language/entities/language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SettingEntity, LanguageEntity])],
  controllers: [SettingController],
  providers: [SettingService],
})
export class SettingModule {}
