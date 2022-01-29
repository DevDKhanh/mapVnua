import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { RegisterUserDto } from './dto/register.dto';
import { UserEntity } from '../users/entities/user.entity';
import { LoginUserDto } from './dto/login.dto';
import { createPagination, resultData } from '../../common/text.helper';
import { GetListDto } from '../../common/dto/index.dto';
import { UpdateUserDto } from '../users/dto/put.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly i18n: I18nRequestScopeService,
    private readonly jwtService: JwtService,
  ) {}
  private HASH_ROUND_NUMBER: number = 5;

  async register(registerUserDto: RegisterUserDto) {
    let userCheck = await this.usersRepository.findOne({
      where: {
        userName: registerUserDto.userName,
      },
    });

    if (userCheck) {
      throw new HttpException(
        await this.i18n.translate('user.USER_IS_EXIST'),
        HttpStatus.BAD_REQUEST,
      );
    }

    let passwordHash = await bcrypt.hashSync(
      registerUserDto.password.trim(),
      this.HASH_ROUND_NUMBER,
    );
    let user = await this.usersRepository.create(registerUserDto);

    user.password = passwordHash;
    const data = await this.usersRepository.save(user);

    return resultData(await this.i18n.translate('user.SUCCESS_SIGNUP'), data);
  }

  async login(loginUserDto: LoginUserDto) {
    let user = await this.usersRepository.findOne({
      where: {
        userName: loginUserDto.userName,
      },
      relations: ['permission'],
    });

    /********** Check userName **********/
    if (!user) {
      throw new HttpException(
        await this.i18n.translate('user.USER_IS_NOT_EXIST'),
        HttpStatus.NOT_FOUND,
      );
    }

    /********** Check Password **********/
    if (!bcrypt.compareSync(loginUserDto.password.trim(), user.password)) {
      throw new HttpException(
        await this.i18n.translate('user.PASSWORD_IS_INCORRECT'),
        HttpStatus.BAD_REQUEST,
      );
    }

    let token = await this.jwtService.signAsync(
      {
        id: user.id,
        role: user.role,
        permission: user.permission,
      },
      { expiresIn: '365d' },
    );

    return resultData(await this.i18n.translate('auth.AUTH_LOGIN_SUCCESS'), {
      token,
      role: user.role,
      id: user.id,
      fullName: user.fullName,
      userName: user.userName,
      permission: user.permission,
    });
  }

  async getList(getListDto: GetListDto) {
    const result = await this.usersRepository.findAndCount({
      skip: (getListDto.page - 1) * getListDto.pageSize,
      take: getListDto.pageSize,
      relations: ['permission'],
      select: ['id', 'fullName', 'actived', 'role', 'permission', 'createdAt'],
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
    const result = await this.usersRepository.findOne(id, {
      select: ['id', 'fullName', 'actived', 'role'],
      relations: ['permission'],
    });

    if (!result) {
      throw new HttpException(
        await this.i18n.translate('site.IS_NOT_EXISTS', {
          args: { name: 'Tài khoản' },
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    return resultData(
      await this.i18n.translate('site.DETAIL_DATA', {
        args: { name: 'phân loại' },
      }),
      { ...result },
    );
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.usersRepository.findOne(id);

    if (!user) {
      throw new HttpException(
        await this.i18n.translate('site.IS_NOT_EXISTS', {
          args: { name: 'Tài khoản' },
        }),
        HttpStatus.NOT_FOUND,
      );
    }

    await this.usersRepository.update({ id }, { ...updateUserDto });
    const userUpdate = this.usersRepository.findOne(id, {
      select: ['id', 'fullName', 'actived', 'role'],
      relations: ['permission'],
    });

    return resultData(
      await this.i18n.translate('site.SUCCESS_UPDATE'),
      userUpdate,
    );
  }

  async delete(id: string) {
    const user = this.usersRepository.findOne(id);

    if (!user) {
      throw new HttpException(
        await this.i18n.translate('site.IS_NOT_EXISTS', {
          args: { name: 'Tài khoản' },
        }),
        HttpStatus.NOT_FOUND,
      );
    }

    await this.usersRepository.delete(id);
    return resultData(await this.i18n.translate('site.SUCCESS_DELETE'), { id });
  }
}
