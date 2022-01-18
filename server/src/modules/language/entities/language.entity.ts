import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tblngonngu' })
export class LanguageEntity {
  @ApiProperty({ example: 'en' })
  @PrimaryColumn({ type: 'char', name: 'idNgonNgu', length: 2 })
  id: string;

  @ApiProperty({ example: 'Tiếng anh' })
  @Column({ type: 'varchar', length: 100, name: 'ten' })
  nameLanguage: string;

  @ApiProperty({ example: 'image.jpg' })
  @Column({ type: 'varchar', length: 200, name: 'icon' })
  icon: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'thoiGianTao' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'thoiGianCapNhat' })
  updatedAt: Date;
}
