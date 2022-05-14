import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { Repository } from 'typeorm';

import { CreateAreaDto } from './dto/post.dto';
import { UpdateAreaDto } from './dto/put.dto';
import { GetListDto } from '../../common/dto/index.dto';
import { AreaEntity } from './entities/area.entity';
import { LanguageEntity } from '../language/entities/language.entity';
import { createPagination, resultData } from '../../common/text.helper';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(AreaEntity)
    private areaRepository: Repository<AreaEntity>,

    @InjectRepository(LanguageEntity)
    private languageRepository: Repository<LanguageEntity>,

    private readonly i18n: I18nRequestScopeService,
  ) {}

  async create(createAreaDto: CreateAreaDto) {
    const createNew = await this.areaRepository.create({
      ...createAreaDto,
    });

    const checkLanguage = await this.languageRepository.findOne(
      createAreaDto.languageId,
    );
    const checkArea = await this.areaRepository.findOne({
      where: {
        languageId: createAreaDto.languageId,
        idArea: createAreaDto.idArea,
      },
    });

    if (!checkLanguage) {
      throw new HttpException(
        await this.i18n.translate('site.IS_NOT_EXISTS', {
          args: { name: 'Id ngôn ngữ' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    if (checkArea) {
      throw new HttpException(
        await this.i18n.translate('site.IS_EXISTS', {
          args: { name: 'Khu vực sử dụng ngôn ngữ và id tương ứng' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    const saveArea = await this.areaRepository.save(createNew);
    return resultData(
      await this.i18n.translate('site.SUCCESS_CREATE'),
      saveArea,
    );
  }

  async update(id: string, updateAreaDto: UpdateAreaDto) {
    const checkId = await this.areaRepository.findOne({
      where: {
        id,
      },
    });
    const checkArea = await this.areaRepository.findOne({
      where: {
        languageId: updateAreaDto.languageId,
        idArea: updateAreaDto.idArea,
      },
    });
    const checkLanguage = await this.languageRepository.findOne(
      updateAreaDto.languageId,
    );

    if (!checkId) {
      throw new HttpException(
        await this.i18n.translate('site.IS_NOT_EXISTS', {
          args: { name: 'khu vực' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    if (checkArea) {
      throw new HttpException(
        await this.i18n.translate('site.IS_EXISTS', {
          args: { name: 'Khu vực sử dụng ngôn ngữ và id tương ứng' },
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

    await this.areaRepository.update({ id }, { ...updateAreaDto });
    const Area = await this.areaRepository.findOne(id);
    const language = await this.languageRepository.findOne(Area.languageId);
    return resultData(await this.i18n.translate('site.SUCCESS_UPDATE'), {
      ...Area,
      language,
    });
  }

  async getList(getListDto: GetListDto) {
    if (!!getListDto.langId && getListDto.langId !== '') {
      const result = await this.areaRepository
        .createQueryBuilder('area')
        .where('area.languageId = :languageId', {
          languageId: getListDto.langId,
        })
        .leftJoinAndSelect('area.language', 'language')
        .skip((+getListDto.page - 1) * getListDto.pageSize)
        .take(+getListDto.pageSize)
        .getManyAndCount();

      return createPagination(
        result[0],
        result[1],
        getListDto.page,
        getListDto.pageSize,
      );
    } else {
      const result = await this.areaRepository
        .createQueryBuilder('area')
        .leftJoinAndSelect('area.language', 'language')
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
  }

  async getDetail(id: string) {
    const area = await this.areaRepository.findOne(id);

    if (!area) {
      throw new HttpException(
        await this.i18n.translate('site.IS_NOT_EXISTS', {
          args: { name: 'khu vực' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    const language = await this.languageRepository.findOne(area.languageId);
    return resultData(
      await this.i18n.translate('site.DETAIL_DATA', {
        args: { name: 'khu vực' },
      }),
      { ...area, language },
    );
  }

  async delete(id: string) {
    try {
      const area = await this.areaRepository.findOne(id);
      if (!area) {
        return new HttpException(
          await this.i18n.translate('site.IS_NOT_EXISTS', {
            args: { name: 'khu vực' },
          }),
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.areaRepository.delete(id);
      return resultData(await this.i18n.translate('site.SUCCESS_DELETE'), id);
    } catch (err) {
      return new HttpException(
        await this.i18n.translate('site.FAILED_DELETE'),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
