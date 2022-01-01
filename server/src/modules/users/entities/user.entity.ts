import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tbl_user' })
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ApiProperty()
  @Column({ length: 50, unique: true })
  userName: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  password: string;

  @ApiProperty()
  @Column({ length: 50, nullable: true })
  fullName: string;

  @ApiProperty()
  @Column('int', { default: 1 })
  role: number;

  @ApiProperty()
  @Column('boolean', { default: true })
  actived: boolean;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
