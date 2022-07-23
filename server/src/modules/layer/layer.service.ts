import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { Repository } from 'typeorm';

import { CreateLayerDto } from './dto/post.dto';
import { UpdateLayerDto } from './dto/put.dto';
import { GetLayerDto, GetListDto } from '../../common/dto/index.dto';
import { ClassifyEntity } from './../classify/entities/classify.entity';
import { LayerEntity } from './entities/layer.entity';
import { LanguageEntity } from '../language/entities/language.entity';
import { AreaEntity } from './../area/entities/area.entity';
import {
  createPagination,
  deleteFile,
  resultData,
} from '../../common/text.helper';

@Injectable()
export class LayerService {
  constructor(
    @InjectRepository(LayerEntity)
    private layerRepository: Repository<LayerEntity>,

    @InjectRepository(LanguageEntity)
    private languageRepository: Repository<LanguageEntity>,

    @InjectRepository(ClassifyEntity)
    private classRepository: Repository<ClassifyEntity>,

    @InjectRepository(AreaEntity)
    private areaRepository: Repository<AreaEntity>,

    private readonly i18n: I18nRequestScopeService,
  ) {}

  async create(createLayerDto: CreateLayerDto) {
    const checkLanguage = await this.languageRepository.findOne(
      createLayerDto.languageId,
    );
    const checkArea = await this.areaRepository.findOne(createLayerDto.areaId);
    const checkClassify = await this.classRepository.findOne(
      createLayerDto.classifyId,
    );
    const checkLayerId = await this.layerRepository.findOne({
      where: {
        nameLayer: createLayerDto.nameLayer,
      },
    });

    if (checkLayerId) {
      throw new HttpException(
        await this.i18n.translate('site.IS_EXISTS', {
          args: { name: 'Tên lớp' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    /********** Kiểm tra dữ liệu ngôn ngữ có tồn tại không **********/
    if (!checkLanguage) {
      throw new HttpException(
        await this.i18n.translate('site.IS_NOT_EXISTS', {
          args: { name: 'Id ngôn ngữ' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
    /********** Kiểm tra dữ liệu phân loại có tồn tại không **********/
    if (!checkClassify) {
      throw new HttpException(
        await this.i18n.translate('site.IS_NOT_EXISTS', {
          args: { name: 'Id phân loại' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
    /********** Kiểm tra dữ liệu khu vực có tồn tại không **********/
    if (!checkArea) {
      throw new HttpException(
        await this.i18n.translate('site.IS_NOT_EXISTS', {
          args: { name: 'Id khu vực' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
    const createNew = await this.layerRepository.create({
      ...createLayerDto,
    });
    const saveLayer = await this.layerRepository.save(createNew);
    return resultData(
      await this.i18n.translate('site.SUCCESS_CREATE'),
      saveLayer,
    );
  }

  async update(id: string, updateLayerDto: UpdateLayerDto) {
    const checkLayerId = await this.layerRepository.findOne(id);
    const checkLanguage = await this.languageRepository.findOne(
      updateLayerDto.languageId,
    );
    const checkArea = await this.areaRepository.findOne(updateLayerDto.areaId);
    const checkClassify = await this.classRepository.findOne(
      updateLayerDto.classifyId,
    );

    if (!checkLayerId) {
      throw new HttpException(
        await this.i18n.translate('site.IS_NOT_EXISTS', {
          args: { name: 'Id lớp' },
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
    if (!checkClassify) {
      throw new HttpException(
        await this.i18n.translate('site.IS_NOT_EXISTS', {
          args: { name: 'Id phân loại' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!checkArea) {
      throw new HttpException(
        await this.i18n.translate('site.IS_NOT_EXISTS', {
          args: { name: 'Id lớp' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.layerRepository.update({ id }, { ...updateLayerDto });

    /********** Trả về thông tin chi tiết sau khi cập nhật của lớp**********/
    const layer = await this.layerRepository.findOne(id);
    const language = await this.languageRepository.findOne(layer.languageId);
    const area = await this.areaRepository.findOne(layer.areaId);
    const classify = await this.classRepository.findOne(layer.classifyId);

    return resultData(await this.i18n.translate('site.SUCCESS_UPDATE'), {
      ...layer,
      language,
      area,
      classify,
    });
  }

  async getList(getListDto: GetListDto) {
    const result = await this.layerRepository
      .createQueryBuilder('layer')
      .leftJoinAndSelect('layer.language', 'language')
      .leftJoinAndSelect('layer.area', 'area')
      .leftJoinAndSelect('layer.classify', 'classify')
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

  async getDataForClient(getListDto: GetLayerDto) {
    const result = await this.layerRepository.find({
      where: {
        areaId: getListDto.areaId,
        languageId: getListDto.langId,
        classifyId: getListDto.classifyId,
      },
    });
    return result;
  }

  async getDetail(id: string) {
    const Layer = await this.layerRepository.findOne(id);
    console.log(Layer);

    if (!Layer) {
      throw new HttpException(
        await this.i18n.translate('site.IS_NOT_EXISTS', {
          args: { name: 'lớp' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    const language = await this.languageRepository.findOne(Layer.languageId);
    const area = await this.areaRepository.findOne(Layer.areaId);
    const classify = await this.classRepository.findOne(Layer.classifyId);
    return resultData(
      await this.i18n.translate('site.DETAIL_DATA', {
        args: { name: 'lớp' },
      }),
      { ...Layer, language, area, classify },
    );
  }

  async delete(id: string) {
    try {
      const layer = await this.layerRepository.findOne(id);
      if (!layer) {
        return new HttpException(
          await this.i18n.translate('site.IS_NOT_EXISTS', {
            args: { name: 'lớp' },
          }),
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.layerRepository.delete(id);
      return resultData(await this.i18n.translate('site.SUCCESS_DELETE'), id);
    } catch (err) {
      return new HttpException(
        await this.i18n.translate('site.FAILED_DELETE'),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
