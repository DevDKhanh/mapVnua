import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMapBaseDto } from './dto/create-map-base.dto';
import { UpdateMapBaseDto } from './dto/update-map-base.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MapSettingEntity } from '../setting/entities/setting.entity';
import { Repository } from 'typeorm';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { createPagination, resultData } from 'src/common/text.helper';
import { GetListDto } from 'src/common/dto/index.dto';

@Injectable()
export class MapBaseService {
  constructor(
    @InjectRepository(MapSettingEntity)
    private mapRepository: Repository<MapSettingEntity>,
    private readonly i18n: I18nRequestScopeService,
  ) {}

  async create(createMapBaseDto: CreateMapBaseDto) {
    const mapCheck = await this.mapRepository.findOne({
      where: {
        ten: createMapBaseDto.ten,
      },
    });

    if (!!mapCheck) {
      throw new HttpException(
        await this.i18n.translate('site.IS_EXISTS', {
          args: { name: 'tên bản đồ' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    const map = this.mapRepository.create(createMapBaseDto);
    const save = await this.mapRepository.save(map);

    return resultData(await this.i18n.translate('site.SUCCESS_CREATE'), save);
  }

  async findAll(getListDto: GetListDto) {
    const listPage = await this.mapRepository.findAndCount({
      take: getListDto.pageSize,
      skip: (getListDto.page - 1) * getListDto.pageSize,
      order: {
        createdAt: 'DESC',
      },
    });
    return createPagination(
      listPage[0],
      listPage[1],
      getListDto.page,
      getListDto.pageSize,
    );
  }
  async findOne(id: number) {
    const map = await this.mapRepository.findOne(id);
    if (!map) {
      throw new NotFoundException(`Map with ID ${id} not found`);
    }

    return resultData(
      await this.i18n.translate('site.DETAIL_DATA', {
        args: { name: 'bản đồ nền' },
      }),
      map,
    );
  }

  async update(id: number, updateMapBaseDto: UpdateMapBaseDto) {
    const existing = await this.mapRepository.findOne(id);
    const updated = this.mapRepository.merge(existing, updateMapBaseDto);

    return resultData(await this.i18n.translate('site.SUCCESS_UPDATE'), {
      ...(await this.mapRepository.save(updated)),
    });
  }

  async remove(id: number) {
    try {
      const map = await this.mapRepository.findOne(id);

      if (!map) {
        throw new HttpException(
          await this.i18n.translate('site.IS_NOT_EXISTS', {
            args: { name: 'bản đồ nền' },
          }),
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.mapRepository.remove(map);
      return resultData(await this.i18n.translate('site.SUCCESS_DELETE'), id);
    } catch (err) {
      return new HttpException(
        await this.i18n.translate('site.FAILED_DELETE'),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
