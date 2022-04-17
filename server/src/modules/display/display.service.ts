import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { Repository } from 'typeorm';

import { CreateDisplayDto } from './dto/post.dto';
import { UpdateDisplayDto } from './dto/put.dto';
import { GetListDto } from '../../common/dto/index.dto';
import { DisplayEntity } from './entities/Display.entity';
import {
  createPagination,
  deleteFile,
  resultData,
} from '../../common/text.helper';
import { LanguageEntity } from '../language/entities/language.entity';

@Injectable()
export class DisplayService {
  constructor(
    @InjectRepository(DisplayEntity)
    private displayRepository: Repository<DisplayEntity>,

    @InjectRepository(LanguageEntity)
    private languageRepository: Repository<LanguageEntity>,

    private readonly i18n: I18nRequestScopeService,
  ) {}

  async create(createDisplayDto: CreateDisplayDto) {
    const createNew = await this.displayRepository.create({
      ...createDisplayDto,
    });

    const checkDisplay = await this.displayRepository.findOne({
      where: {
        languageId: createDisplayDto.languageId,
        keyword: createDisplayDto.keyword,
      },
    });

    if (checkDisplay) {
      throw new HttpException(
        await this.i18n.translate('site.IS_NOT_EXISTS', {
          args: { name: 'Từ khóa đã được sử dụng cho ngôn ngữ này' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    const saveDisplay = await this.displayRepository.save(createNew);
    return resultData(
      await this.i18n.translate('site.SUCCESS_CREATE'),
      saveDisplay,
    );
  }

  async update(id: number, updateDisplayDto: UpdateDisplayDto) {
    const checkId = await this.displayRepository.findOne({
      where: {
        id,
      },
    });

    if (!checkId) {
      throw new HttpException(
        await this.i18n.translate('site.IS_NOT_EXISTS', {
          args: { name: 'Giao diện' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.displayRepository.update({ id }, { ...updateDisplayDto });
    const display = await this.displayRepository.findOne(id);
    return resultData(await this.i18n.translate('site.SUCCESS_UPDATE'), {
      ...display,
    });
  }

  async getList(getListDto: GetListDto) {
    if (!!getListDto.langId && getListDto.langId !== '') {
      const result = await this.displayRepository
        .createQueryBuilder('display')
        .where('display.languageId = :languageId', {
          languageId: getListDto.langId,
        })
        .leftJoinAndSelect('display.language', 'language')
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
      const result = await this.displayRepository
        .createQueryBuilder('display')
        .leftJoinAndSelect('display.language', 'language')
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
    const display = await this.displayRepository.findOne(id);

    if (!display) {
      throw new HttpException(
        await this.i18n.translate('site.IS_NOT_EXISTS', {
          args: { name: 'diao diện' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    const language = await this.languageRepository.findOne(display.languageId);
    return resultData(
      await this.i18n.translate('site.DETAIL_DATA', {
        args: { name: 'diao diện' },
      }),
      { ...display, language },
    );
  }

  async delete(id: string) {
    try {
      const display = await this.displayRepository.findOne(id);
      if (!display) {
        return new HttpException(
          await this.i18n.translate('site.IS_NOT_EXISTS', {
            args: { name: 'giao diện' },
          }),
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.displayRepository.delete(id);
      return resultData(await this.i18n.translate('site.SUCCESS_DELETE'), id);
    } catch (err) {
      return new HttpException(
        await this.i18n.translate('site.FAILED_DELETE'),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
