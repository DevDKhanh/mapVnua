import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nRequestScopeService } from 'nestjs-i18n';
import {
  createPagination,
  deleteFile,
  resultData,
} from '../../common/text.helper';
import { Repository } from 'typeorm';
import { UploadEntity } from './entities/upload.entity';
import { Pagination } from 'src/common/dto/index.dto';
import { QueryDelete } from './dto/upload.dto';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(UploadEntity)
    private uploadRepository: Repository<UploadEntity>,
    private readonly i18n: I18nRequestScopeService,
  ) {}

  async getPathFiles(getListDto: Pagination) {
    let result = await this.uploadRepository.findAndCount({
      skip: (+getListDto.page - 1) * getListDto.pageSize,
      take: +getListDto.pageSize,
      where: { typeFile: getListDto.type },
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

  async savePath(filename: string, type: number) {
    const path = await this.uploadRepository.create({
      typeFile: type,
      path: filename,
    });
    await this.uploadRepository.save(path);

    return { filename };
  }

  async delete(queryDelete: QueryDelete) {
    const infoFile = await this.uploadRepository.findOne(queryDelete.id);
    if (!!infoFile) {
      await deleteFile(infoFile.path);
      await this.uploadRepository.delete(queryDelete.id);
      return resultData(
        await this.i18n.translate('site.SUCCESS_DELETE'),
        queryDelete.id,
      );
    }
    return new HttpException(
      await this.i18n.translate('site.IS_NOT_EXISTS', {
        args: { name: 'file' },
      }),
      HttpStatus.BAD_REQUEST,
    );
  }
}
