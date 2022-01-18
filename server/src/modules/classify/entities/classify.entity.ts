import { LayerEntity } from './../../layer/entities/layer.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { LanguageEntity } from '../../language/entities/language.entity';
@Entity({ name: 'tblphanloai' })
export class ClassifyEntity {
  @ApiProperty({ example: 'id phân loại' })
  @PrimaryColumn({ type: 'varchar', length: 100, name: 'idPhanLoai' })
  id: string;

  @ApiProperty({ example: 'tên lớp' })
  @Column({
    type: 'varchar',
    name: 'tenPhanLoai',
    length: 100,
    nullable: false,
  })
  nameClassify: string;

  @ApiProperty({ example: 'en' })
  @Column({ type: 'char', name: 'idNgonNgu', length: 2, nullable: false })
  languageId: string;

  @ApiProperty()
  @ManyToOne(() => LanguageEntity)
  @JoinColumn({ name: 'idNgonNgu', referencedColumnName: 'id' })
  language: LanguageEntity;

  @ApiProperty()
  @OneToMany(
    () => LayerEntity,
    layer => layer.classify,
  )
  layers: LayerEntity[];

  @ApiProperty({ example: 1 })
  @Column({
    type: 'tinyint',
    name: 'hienThi',
    nullable: false,
    default: 1,
  })
  active: number;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', name: 'stt', nullable: false })
  no: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'thoiGianTao' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'thoiGianCapNhat' })
  updatedAt: Date;
}
