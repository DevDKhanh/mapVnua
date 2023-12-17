import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { LanguageEntity } from '../../language/entities/language.entity';

@Entity({ name: 'tblBanDoNen' })
export class MapSettingEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'Bản đồ Hà Nội' })
  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  ten: string;

  @ApiProperty({ example: 'url image' })
  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  urlImage: string;

  @ApiProperty({ example: 'Bản đồ Hà Nội' })
  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  url: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'thoiGianTao' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'thoiGianCapNhat' })
  updatedAt: Date;

  @OneToMany(
    () => SettingEntity,
    x => x.map,
  )
  settings: SettingEntity[];
}

@Entity({ name: 'tblcauhinh' })
export class SettingEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', name: 'idNgonNgu', nullable: false })
  languageId: number;

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

  @ApiProperty({ example: 'Bản đồ Hà Nội' })
  @Column({
    type: 'varchar',
    length: 225,
    name: 'slogan',
    nullable: true,
    default: '',
  })
  slogan: string;

  @ApiProperty({ example: 'en' })
  @Column({ type: 'int', nullable: true })
  mapId: number;

  @ApiProperty({ type: () => MapSettingEntity })
  @ManyToOne(
    () => MapSettingEntity,
    map => map,
    {
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn({ name: 'mapId', referencedColumnName: 'id' })
  map: MapSettingEntity;

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

  @ApiProperty({ example: 'image.jpg' })
  @Column({
    type: 'varchar',
    nullable: false,
    length: 200,
  })
  icon: string;

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
