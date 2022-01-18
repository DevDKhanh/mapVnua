import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { RegisterUserDto } from './dto/register.dto';
import { UserEntity } from '../users/entities/user.entity';
import { LoginUserDto } from './dto/login.dto';
import { resultData } from 'src/common/text.helper';

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
      },
      { expiresIn: '365d' },
    );

    return resultData(await this.i18n.translate('auth.AUTH_LOGIN_SUCCESS'), {
      token,
      role: user.role,
      id: user.id,
      fullName: user.fullName,
      userName: user.userName,
    });
  }
}
