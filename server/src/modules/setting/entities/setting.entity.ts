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
@Entity({ name: 'tblcauhinh' })
export class SettingEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'en' })
  @Column({ type: 'char', name: 'idNgonNgu', length: 2, nullable: false })
  languageId: string;

  @ApiProperty()
  @ManyToOne(
    () => LanguageEntity,
    lang => lang,
  )
  @JoinColumn({ name: 'idNgonNgu', referencedColumnName: 'id' })
  language: LanguageEntity;

  @ApiProperty({ example: 'Bản đồ Hà Nội' })
  @Column({
    type: 'varchar',
    length: 200,
    name: 'tieuDe',
    nullable: false,
  })
  title: string;

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

  @ApiProperty({ example: 6 })
  @Column({ type: 'int', default: 6 })
  zoom: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'thoiGianTao' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'thoiGianCapNhat' })
  updatedAt: Date;
}
