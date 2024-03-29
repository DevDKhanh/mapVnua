import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { LanguageEntity } from '../../language/entities/language.entity';
@Entity({ name: 'tblkhuvuc' })
export class AreaEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ApiProperty({ example: 'id Khu vực' })
  @Column({ type: 'varchar', length: 100, name: 'idKhuVuc' })
  idArea: string;

  @ApiProperty({ example: 'tên Khu vực' })
  @Column({
    type: 'varchar',
    name: 'tenKhuVuc',
    length: 100,
    nullable: false,
  })
  nameArea: string;

  @ApiProperty({ example: 'en' })
  @Column({ type: 'int', name: 'idNgonNgu', nullable: false })
  languageId: number;

  @ApiProperty()
  @ManyToOne(() => LanguageEntity)
  @JoinColumn({ name: 'idNgonNgu', referencedColumnName: 'id' })
  language: LanguageEntity;

  @ApiProperty({ example: 15.14 })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 6,
    name: 'toaDoLat',
    nullable: false,
  })
  lat: number;

  @ApiProperty({ example: 50.14 })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 6,
    name: 'toaDoLng',
    nullable: false,
  })
  lng: number;

  @ApiProperty({ example: 1 })
  @Column({
    type: 'tinyint',
    name: 'hienThi',
    nullable: false,
    default: 1,
  })
  active: number;

  @ApiProperty({ example: 10 })
  @Column({ type: 'int', default: 10 })
  zoom: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'thoiGianTao' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'thoiGianCapNhat' })
  updatedAt: Date;
}
