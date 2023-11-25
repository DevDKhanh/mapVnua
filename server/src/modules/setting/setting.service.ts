import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { Repository } from 'typeorm';

import { CreateSettingDto } from './dto/post.dto';
import { UpdateSettingDto } from './dto/put.dto';
import { GetListDto } from '../../common/dto/index.dto';
import { MapSettingEntity, SettingEntity } from './entities/setting.entity';
import { LanguageEntity } from '../language/entities/language.entity';
import { createPagination, resultData } from '../../common/text.helper';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(SettingEntity)
    private settingRepository: Repository<SettingEntity>,

    @InjectRepository(LanguageEntity)
    private languageRepository: Repository<LanguageEntity>,

    @InjectRepository(MapSettingEntity)
    private mapRepository: Repository<MapSettingEntity>,

    private readonly i18n: I18nRequestScopeService,
  ) {}

  async create(createSettingDto: CreateSettingDto) {
    const createNew = await this.settingRepository.create({
      ...createSettingDto,
    });

    const checkLanguage = await this.languageRepository.findOne(
      createSettingDto.languageId,
    );

    if (!checkLanguage) {
      throw new HttpException(
        await this.i18n.translate('site.IS_NOT_EXISTS', {
          args: { name: 'Id ngôn ngữ' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    const saveSetting = await this.settingRepository.save(createNew);
    return resultData(
      await this.i18n.translate('site.SUCCESS_CREATE'),
      saveSetting,
    );
  }

  async update(id: number, updateSettingDto: UpdateSettingDto) {
    const checkId = await this.settingRepository.findOne({
      where: {
        id,
      },
    });
    const checkLanguage = await this.languageRepository.findOne(
      updateSettingDto.languageId,
    );

    if (!checkId) {
      throw new HttpException(
        await this.i18n.translate('site.IS_NOT_EXISTS', {
          args: { name: 'Cấu hình' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!checkLanguage) {
      throw new HttpException(
        await this.i18n.translate('site.IS_NOT_EXISTS', {
          args: { name: 'Id ngôn ngữ' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.settingRepository.update({ id }, { ...updateSettingDto });
    const setting = await this.settingRepository.findOne(id);
    const language = await this.languageRepository.findOne(setting.languageId);
    return resultData(await this.i18n.translate('site.SUCCESS_UPDATE'), {
      ...setting,
      language,
    });
  }

  async getList(getListDto: GetListDto) {
    const result = await this.settingRepository
      .createQueryBuilder('setting')
      .leftJoinAndSelect('setting.map', 'map')
      .leftJoinAndSelect('setting.language', 'language')
      .skip((+getListDto.page - 1) * getListDto.pageSize)
      .take(+getListDto.pageSize)
      .getManyAndCount();

    return createPagination(
      result[0],
      result[1],
      getListDto.page,
      getListDto.pageSize,
    );
  }

  async getListMap() {
    const result = await this.mapRepository.find();
    return resultData(
      await this.i18n.translate('site.DETAIL_DATA', {
        args: { name: 'bản đồ' },
      }),
      result,
    );
  }

  async getDetail(id: number) {
    const setting = await this.settingRepository.findOne(id, {
      relations: ['language', 'map'],
    });

    if (!setting) {
      throw new HttpException(
        await this.i18n.translate('site.IS_NOT_EXISTS', {
          args: { name: 'Cấu hình' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    return resultData(
      await this.i18n.translate('site.DETAIL_DATA', {
        args: { name: 'Cấu hình' },
      }),
      setting,
    );
  }

  async delete(id: number) {
    try {
      const setting = await this.settingRepository.findOne(id);
      if (!setting) {
        return new HttpException(
          await this.i18n.translate('site.IS_NOT_EXISTS', {
            args: { name: 'Cấu hình' },
          }),
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.settingRepository.delete(id);
      return resultData(await this.i18n.translate('site.SUCCESS_DELETE'), id);
    } catch (err) {
      return new HttpException(
        await this.i18n.translate('site.FAILED_DELETE'),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
