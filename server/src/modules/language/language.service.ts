import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { Repository } from 'typeorm';

import { CreateLanguageDto } from './dto/post.dto';
import { UpdateLanguageDto } from './dto/put.dto';
import { GetListDto } from '../../common/dto/index.dto';
import { LanguageEntity } from './entities/language.entity';
import { createPagination, resultData } from '../../common/text.helper';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(LanguageEntity)
    private languageRepository: Repository<LanguageEntity>,
    private readonly i18n: I18nRequestScopeService,
  ) {}

  async create(createLanguageDto: CreateLanguageDto) {
    const idLength: number = 2;
    const languageNew = await this.languageRepository.create({
      ...createLanguageDto,
    });
    const checkId = await this.languageRepository.findOne({
      where: {
        id: createLanguageDto.id,
      },
    });

    if (checkId) {
      throw new HttpException(
        await this.i18n.translate('site.IS_EXISTS', {
          args: { name: 'id' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    if (createLanguageDto.id.length > idLength) {
      throw new HttpException(
        await this.i18n.translate('site.LENGHT_IS_MAX', {
          args: { name: 'id', max: idLength },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    const saveNew = await this.languageRepository.save(languageNew);
    return resultData(
      await this.i18n.translate('site.SUCCESS_CREATE'),
      saveNew,
    );
  }

  async update(id: string, updateLanguageDto: UpdateLanguageDto) {
    const checkId = await this.languageRepository.findOne({
      where: {
        id,
      },
    });

    if (!checkId) {
      throw new HttpException(
        await this.i18n.translate('site.IS_NOT_EXISTS', {
          args: { name: 'Ngôn ngữ' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.languageRepository.update({ id }, { ...updateLanguageDto });
    const data = await this.languageRepository.findOne(id);
    return resultData(await this.i18n.translate('site.SUCCESS_UPDATE'), data);
  }

  async getList(getListDto: GetListDto) {
    let result = await this.languageRepository.findAndCount({
      skip: (+getListDto.page - 1) * getListDto.pageSize,
      take: +getListDto.pageSize,
      order: {
        createdAt: -1,
      },
    });

    return createPagination(
      result[0],
      result[1],
      getListDto.page,
      getListDto.pageSize,
    );
  }

  async getDetail(id: string) {
    const detail = await this.languageRepository.findOne({
      where: {
        id,
      },
    });

    return resultData(
      await this.i18n.translate('site.DETAIL_DATA', {
        args: { name: 'ngôn ngữ' },
      }),
      detail,
    );
  }

  async delete(id: string) {
    try {
      const language = await this.languageRepository.findOne(id);
      if (!language) {
        return new HttpException(
          await this.i18n.translate('site.IS_NOT_EXISTS', {
            args: { name: 'ngôn ngữ' },
          }),
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.languageRepository.delete(id);
      return resultData(await this.i18n.translate('site.SUCCESS_DELETE'), id);
    } catch (err) {
      return new HttpException(
        await this.i18n.translate('site.FAILED_DELETE'),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
