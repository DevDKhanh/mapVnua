import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { createPagination } from 'src/common/text.helper';
import { Repository } from 'typeorm';
import { GetListUserDto } from './dto/get.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private authRepository: Repository<UserEntity>,

    private readonly i18n: I18nRequestScopeService,
  ) {}
  async getList(getListUserDto: GetListUserDto) {
    let result = await this.authRepository.findAndCount({
      skip: (+getListUserDto.page - 1) * getListUserDto.pageSize,
      take: +getListUserDto.pageSize,
      order: {
        createdAt: -1,
      },
    });

    return createPagination(
      result[0],
      result[1],
      getListUserDto.page,
      getListUserDto.pageSize,
    );
  }
}
