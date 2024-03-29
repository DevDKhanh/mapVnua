import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { AreaEntity } from './../../area/entities/area.entity';
import { ClassifyEntity } from './../../classify/entities/classify.entity';
import { LanguageEntity } from '../../language/entities/language.entity';

@Entity({ name: 'tbllop' })
export class LayerEntity {
  // @ApiProperty({ example: 'id Lớp' })
  // @PrimaryColumn({ type: 'varchar', length: 100, name: 'idLop' })
  // id: string;

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ApiProperty({ example: 'tên Lớp' })
  @Column({
    type: 'varchar',
    name: 'tenLop',
    length: 100,
    unique: false,
    nullable: false,
  })
  nameLayer: string;

  @ApiProperty({ example: 'en' })
  @Column({ type: 'int', name: 'idNgonNgu', nullable: false })
  languageId: number;

  @ApiProperty()
  @ManyToOne(() => LanguageEntity)
  @JoinColumn({ name: 'idNgonNgu', referencedColumnName: 'id' })
  language: LanguageEntity;

  @ApiProperty({ example: 'abcde' })
  @Column({ type: 'varchar', name: 'idPhanLoai', length: 100, nullable: false })
  classifyId: string;

  @ApiProperty()
  @ManyToOne(() => ClassifyEntity)
  @JoinColumn({ name: 'idPhanLoai', referencedColumnName: 'id' })
  classify: ClassifyEntity;

  @ApiProperty({ example: 'abcde' })
  @Column({ type: 'varchar', name: 'idKhuVuc', length: 100, nullable: false })
  areaId: string;

  @ApiProperty()
  @ManyToOne(() => AreaEntity)
  @JoinColumn({ name: 'idKhuVuc', referencedColumnName: 'id' })
  area: AreaEntity;

  @ApiProperty({ example: 'vector' || 'raster' })
  @Column({ type: 'varchar', name: 'kieu', length: 100, nullable: false })
  style: string;

  @ApiProperty({ example: './upload/abc.json' })
  @Column({ type: 'varchar', name: 'duongDan', length: 200, nullable: false })
  path: string;

  @ApiProperty({ example: 'abc.img' })
  @Column({ type: 'varchar', length: 200, nullable: false })
  icon: string;

  @ApiProperty({ example: 'XOI_MON_S1' })
  @Column({ type: 'varchar', name: 'truongMauNen', length: 50 })
  keyColor: string;

  @ApiProperty({ example: 'XOI_MON_S1' })
  @Column({ type: 'varchar', name: 'truongIcon', length: 50 })
  keyIcon: string;

  @ApiProperty({ example: 'KEY_MAP_LABEL' })
  @Column({ type: 'varchar', name: 'truongNhan', length: 50 })
  labelMap: string;

  @ApiProperty({ example: '0' })
  @Column({
    type: 'tinyint',
    name: 'kieuNhapMau',
    nullable: false,
    default: 0,
  })
  typeColor: number;

  @ApiProperty({ example: 'Tiêu đề chú thích' })
  @Column({
    type: 'nvarchar',
    name: 'tieuDeChuThich',
    length: 200,
    default: '',
  })
  titleNote: string;

  @ApiProperty({
    example:
      '#36fa00|0_10:#26c3f7|10_20:#4854f9|20_30:#d36cf9|30_40:#f96ccc|40_100:#fcb6b6|100_700',
  })
  @Column({ type: 'varchar', name: 'duLieuDaiMau', length: 4000 })
  dataColor: string;

  @ApiProperty({
    example: '',
  })
  @Column({ type: 'varchar', name: 'duLieuIcon', length: 4000, default: '' })
  dataIcon: string;

  @ApiProperty({
    example:
      '[{"key":"Shape_Leng","value":"Shape_Leng","isCheck":true},{"key":"MaDat","value":"MaDat0002","isCheck":true},{"key":"Shape_Area","value":"Shape_Area","isCheck":true}]',
  })
  @Column({ type: 'varchar', name: 'duLieuThayThe', length: 4000 })
  titleDetail: string;

  @ApiProperty({ example: '#00000' })
  @Column({ type: 'varchar', name: 'mauVien', length: 10 })
  borderColor: string;

  @ApiProperty({ example: 2 })
  @Column({ type: 'tinyint', name: 'doRongVien' })
  widthBorder: number;

  @ApiProperty({ example: 2 })
  @Column({
    type: 'float',
    name: 'vienTrongSuot',
    precision: 2,
    scale: 1,
  })
  opacityBorder: number;

  @ApiProperty({ example: '#0f0' })
  @Column({
    type: 'varchar',
    name: 'mauNen',
    length: 10,
  })
  backgroundColor: string;

  @ApiProperty({ example: 2 })
  @Column({
    type: 'float',
    name: 'nenTrongSuot',
    precision: 2,
    scale: 1,
  })
  opacityBackground: number;

  @ApiProperty({ example: 15.14 })
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 15,
    name: 'toaDoLatSW',
  })
  latSW: number;

  @ApiProperty({ example: 50.14 })
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 15,
    name: 'toaDoLngSW',
  })
  lngSW: number;

  @ApiProperty({ example: 15.14 })
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 15,
    name: 'toaDoLatNE',
  })
  latNE: number;

  @ApiProperty({ example: 50.14 })
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 15,
    name: 'toaDoLngNE',
  })
  lngNE: number;

  @ApiProperty({ example: 1 })
  @Column({
    type: 'tinyint',
    name: 'hienThi',
    nullable: false,
    default: 1,
  })
  active: number;

  @ApiProperty({ example: 1 })
  @Column({
    type: 'tinyint',
    name: 'tichChon',
    nullable: false,
    default: 0,
  })
  checked: number;

  @ApiProperty({ example: 1 })
  @Column({
    type: 'tinyint',
    name: 'hienThiNhan',
    nullable: false,
    default: 0,
  })
  displayLabel: number;

  @ApiProperty({ example: 1 })
  @Column({
    type: 'tinyint',
    name: 'hienThiChuThich',
    nullable: false,
    default: 1,
  })
  activeNote: number;

  @ApiProperty({ example: 1 })
  @Column({
    type: 'tinyint',
    name: 'hienThiTooltip',
    nullable: false,
    default: 1,
  })
  activeTooltip: number;

  @ApiProperty({ example: 10 })
  @Column({ type: 'int', default: 0 })
  zIndex: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'thoiGianTao' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'thoiGianCapNhat' })
  updatedAt: Date;
}
