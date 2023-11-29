import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { LanguageEntity } from '../../language/entities/language.entity';
import { LayerEntity } from './../../layer/entities/layer.entity';

@Entity({ name: 'tblBangMau' })
export class Color {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({ example: 'ABC' })
  @Column({
    type: 'varchar',
    name: 'maMau',
    length: 100,
    nullable: false,
  })
  code: string;

  @ApiProperty({ example: 'Description' })
  @Column({ type: 'nvarchar', length: 1024, name: 'moTa' })
  description: string;

  @ApiProperty({ example: 255 })
  @Column({ type: 'int' })
  red: number;

  @ApiProperty({ example: 255 })
  @Column({ type: 'int' })
  green: number;

  @ApiProperty({ example: 255 })
  @Column({ type: 'int' })
  blue: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'thoiGianTao' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'thoiGianCapNhat' })
  updatedAt: Date;
}
