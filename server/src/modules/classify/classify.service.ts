import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { Repository } from 'typeorm';

import { CreateClassifyDto } from './dto/post.dto';
import { UpdateClassifyDto } from './dto/put.dto';
import { GetListDto } from '../../common/dto/index.dto';
import { ClassifyEntity } from './entities/classify.entity';
import { LanguageEntity } from '../language/entities/language.entity';
import { createPagination, resultData } from '../../common/text.helper';
import { LayerEntity } from '../layer/entities/layer.entity';

@Injectable()
export class ClassifyService {
  constructor(
    @InjectRepository(ClassifyEntity)
    private classifyRepository: Repository<ClassifyEntity>,

    @InjectRepository(LanguageEntity)
    private languageRepository: Repository<LanguageEntity>,

    @InjectRepository(LayerEntity)
    private layerRepository: Repository<LayerEntity>,

    private readonly i18n: I18nRequestScopeService,
  ) {}

  async create(createClassifyDto: CreateClassifyDto) {
    const createNew = await this.classifyRepository.create({
      ...createClassifyDto,
    });

    const checkLanguage = await this.languageRepository.findOne(
      createClassifyDto.languageId,
    );

    const checkNo = await this.classifyRepository.findOne({
      no: createClassifyDto.no,
    });

    if (checkNo) {
      throw new HttpException(
        await this.i18n.translate('site.IS_EXISTS', {
          args: { name: 'Số thứ tự' },
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

    const saveClassify = await this.classifyRepository.save(createNew);
    return resultData(
      await this.i18n.translate('site.SUCCESS_CREATE'),
      saveClassify,
    );
  }

  async update(id: string, updateClassifyDto: UpdateClassifyDto) {
    const checkId = await this.classifyRepository.findOne({
      where: {
        id,
      },
    });
    const checkLanguage = await this.languageRepository.findOne(
      updateClassifyDto.languageId,
    );

    if (!checkId) {
      throw new HttpException(
        await this.i18n.translate('site.IS_NOT_EXISTS', {
          args: { name: 'phân loại' },
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

    await this.classifyRepository.update({ id }, { ...updateClassifyDto });
    const Classify = await this.classifyRepository.findOne(id);
    const language = await this.languageRepository.findOne(Classify.languageId);
    return resultData(await this.i18n.translate('site.SUCCESS_UPDATE'), {
      ...Classify,
      language,
    });
  }

  async getList(getListDto: GetListDto) {
    if (!!getListDto.langId && getListDto.langId !== '') {
      const result = await this.classifyRepository
        .createQueryBuilder('classify')
        .where('classify.languageId = :languageId', {
          languageId: getListDto.langId,
        })
        .leftJoinAndSelect('classify.language', 'language')
        .skip((+getListDto.page - 1) * getListDto.pageSize)
        .take(+getListDto.pageSize)
        .orderBy('classify.no', 'ASC')
        .getManyAndCount();

      return createPagination(
        result[0],
        result[1],
        getListDto.page,
        getListDto.pageSize,
      );
    } else {
      const result = await this.classifyRepository
        .createQueryBuilder('classify')

        .leftJoinAndSelect('classify.language', 'language')
        .leftJoinAndSelect('classify.layers', 'layers')
        .skip((+getListDto.page - 1) * getListDto.pageSize)
        .take(+getListDto.pageSize)
        .orderBy('classify.no', 'ASC')
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
    const result = await this.classifyRepository.findOne(id);

    if (!result) {
      throw new HttpException(
        await this.i18n.translate('site.IS_NOT_EXISTS', {
          args: { name: 'phân loại' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    const language = await this.languageRepository.findOne(result.languageId);
    const layers = await this.layerRepository.find({
      where: {
        classifyId: result.id,
      },
    });

    return resultData(
      await this.i18n.translate('site.DETAIL_DATA', {
        args: { name: 'phân loại' },
      }),
      { ...result, language, layers },
    );
  }

  async delete(id: string) {
    try {
      const Classify = await this.classifyRepository.findOne(id);
      if (!Classify) {
        return new HttpException(
          await this.i18n.translate('site.IS_NOT_EXISTS', {
            args: { name: 'phân loại' },
          }),
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.classifyRepository.delete(id);
      return resultData(await this.i18n.translate('site.SUCCESS_DELETE'), id);
    } catch (err) {
      return new HttpException(
        await this.i18n.translate('site.FAILED_DELETE'),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
