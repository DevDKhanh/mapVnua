import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { createPagination, resultData } from '../../common/text.helper';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { AddPermissionAdminDto } from './dto/post.dto';
import { PermissionEntity } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly i18n: I18nRequestScopeService,
  ) {}

  async create(userId: string, addPermissionAdminDto: AddPermissionAdminDto) {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new HttpException(
        await this.i18n.translate('user.USER_NOT_FOUND'),
        HttpStatus.NOT_FOUND,
      );
    }
    const permissionCheck = await this.permissionRepository.findOne({
      userId,
    });
    if (permissionCheck) {
      await this.permissionRepository.update(
        { userId },
        { ...addPermissionAdminDto },
      );

      const data = await this.permissionRepository.findOne({
        where: { userId },
      });

      return resultData(await this.i18n.translate('site.SUCCESS_UPDATE'), data);
    }

    let permission = this.permissionRepository.create({
      ...addPermissionAdminDto,
      userId,
    });

    await this.permissionRepository.save(permission);
    user.permission = permission;
    await this.userRepository.save(user);

    return resultData(
      await this.i18n.translate('site.SUCCESS_CREATE'),
      permission,
    );
  }
}
