import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tblngonngu' })
export class LanguageEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'DH_ABC' })
  @Column({ type: 'varchar', name: 'idNgonNgu', length: 10 })
  idLanguage: string;

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
