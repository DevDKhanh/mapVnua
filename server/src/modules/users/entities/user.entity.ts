import { ApiProperty } from '@nestjs/swagger';
import { PermissionEntity } from 'src/modules/permission/entities/permission.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tbltaikhoan' })
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ApiProperty()
  @Column({ length: 50, unique: true })
  userName: string;

  @ApiProperty()
  @Column({ type: 'text' })
  password: string;

  @ApiProperty()
  @Column({ length: 50 })
  fullName: string;

  @OneToOne(
    () => PermissionEntity,
    permission => permission.user,
    { nullable: true, onDelete: 'SET NULL' },
  )
  @JoinColumn({ name: 'permissionId' })
  permission: PermissionEntity;

  @ApiProperty()
  @Column({ type: 'tinyint', default: 1 })
  role: number;

  @ApiProperty()
  @Column('boolean', { default: true })
  actived: boolean;

  @ApiProperty()
  @Column('varchar', { default: '', length: 1024 })
  token: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
