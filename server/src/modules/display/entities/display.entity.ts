import { ApiProperty } from '@nestjs/swagger';
import { LanguageEntity } from 'src/modules/language/entities/language.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tblgiaodien' })
export class DisplayEntity {
  @ApiProperty({ example: 'en' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'TIEU_DE_MAP' })
  @Column({ type: 'varchar', length: 100, name: 'tuKhoa' })
  keyword: string;

  @ApiProperty({ example: 'en' })
  @Column({ type: 'char', name: 'idNgonNgu', length: 2, nullable: false })
  languageId: string;

  @ApiProperty()
  @ManyToOne(() => LanguageEntity)
  @JoinColumn({ name: 'idNgonNgu', referencedColumnName: 'id' })
  language: LanguageEntity;

  @ApiProperty({ example: 'Bản đồ - develop by teamVnua' })
  @Column({ type: 'varchar', length: 1000, name: 'dich' })
  trans: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'thoiGianTao' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'thoiGianCapNhat' })
  updatedAt: Date;
}
