import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { Repository } from 'typeorm';

import { CreateSettingDto } from './dto/post.dto';
import { GetListSettingDto } from './dto/get.dto';
import { SettingEntity } from './entities/setting.entity';
import { createPagination, resultData } from '../../common/text.helper';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(SettingEntity)
    private settingRepository: Repository<SettingEntity>,
    private readonly i18n: I18nRequestScopeService,
  ) {}

  async create(createSettingDto: CreateSettingDto) {
    const setting = await this.settingRepository.create(createSettingDto);
    const newSetting = await this.settingRepository.save(setting);
    return resultData(
      await this.i18n.translate('setting.SETTING_CREATE_SUCCESS'),
      newSetting,
    );
  }

  async gettAll(getListSettingDto: GetListSettingDto) {
    const result = await this.settingRepository.findAndCount({
      skip: (+getListSettingDto.page - 1) * getListSettingDto.pageSize,
      take: +getListSettingDto.pageSize,
      order: {
        createdAt: -1,
      },
    });

    return createPagination(
      result[0],
      result[1],
      getListSettingDto.page,
      getListSettingDto.pageSize,
    );
  }
}
