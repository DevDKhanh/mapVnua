import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tblquyenquantri' })
export class PermissionEntity {
  @ApiProperty({ description: 'id ' })
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @OneToOne(
    () => UserEntity,
    user => user.permission,
    {
      orphanedRowAction: 'delete',
    },
  )
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ApiProperty({ description: 'user id ' })
  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @ApiProperty({ description: 'quyền xem' })
  @Column('boolean', { name: 'quyenXem', default: false })
  permissionSeen: boolean;

  @ApiProperty({ description: 'quyền sửa' })
  @Column('boolean', { name: 'quyenSua', default: false })
  permissionEdit: boolean;

  @ApiProperty({ description: 'quyền xóa' })
  @Column('boolean', { name: 'quyenXoa', default: false })
  permissionDelete: boolean;

  @ApiProperty({ description: 'quyền tạo mới' })
  @Column('boolean', { name: 'quyenThem', default: false })
  permissionCreate: boolean;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
