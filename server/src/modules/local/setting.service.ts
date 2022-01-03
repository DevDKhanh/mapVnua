import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { Repository } from 'typeorm';

import { CreateSettingDto } from './dto/post.dto';
import { GetListSettingDto } from './dto/get.dto';
import { UpdateSettingDto } from './dto/put.dto';
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

  async getSettingActive() {
    const setting = await this.settingRepository.findOne({
      where: { active: true },
    });

    if (!setting) {
      throw new HttpException(
        await this.i18n.translate('setting.SETTING_NOT_FOUND'),
        HttpStatus.NOT_FOUND,
      );
    }

    return resultData(
      await this.i18n.translate('setting.SETTING_DATA'),
      setting,
    );
  }

  async getOne(id: number) {
    const setting = await this.settingRepository.findOne(id);
    if (!setting) {
      throw new HttpException(
        await this.i18n.translate('setting.SETTING_NOT_FOUND'),
        HttpStatus.NOT_FOUND,
      );
    }

    return resultData(
      await this.i18n.translate('setting.SETTING_DATA'),
      setting,
    );
  }

  async updateOne(id: number, updateSettingDto: UpdateSettingDto) {
    const setting = await this.settingRepository.findOne(id);

    console.log(updateSettingDto);
    if (!setting) {
      throw new HttpException(
        await this.i18n.translate('setting.SETTING_NOT_FOUND'),
        HttpStatus.NOT_FOUND,
      );
    }

    if (updateSettingDto.active) {
      console.log('run here', updateSettingDto.active);
      await this.settingRepository.update(
        {
          active: true,
        },
        { active: false },
      );

      await this.settingRepository.update(
        {
          id,
        },
        { ...updateSettingDto, active: true },
      );

      const settingAfter = await this.settingRepository.findOne(id);
      return resultData(
        await this.i18n.translate('setting.SETTING_UPDATE_SUCCESS'),
        settingAfter,
      );
    }

    await this.settingRepository.update(
      { id },
      { ...updateSettingDto, language: 'en' },
    );
    const settingAfter = await this.settingRepository.findOne(id);
    return resultData(
      await this.i18n.translate('setting.SETTING_UPDATE_SUCCESS'),
      settingAfter,
    );
  }

  async deleteOne(id: number) {
    await this.settingRepository.delete({ id });
    return resultData(
      await this.i18n.translate('setting.SETTING_DELETE_SUCCESS'),
      { id },
    );
  }
}
