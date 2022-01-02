import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tbl_setting' })
export class SettingEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'vi' })
  @Column({ type: 'varchar', length: 20 })
  language: string;

  @ApiProperty({ example: 'Bản đồ Hà Nội' })
  @Column({ type: 'nvarchar', length: 100 })
  title: string;

  @ApiProperty({ example: '50.12' })
  @Column({ type: 'varchar', length: 100 })
  lat: string;

  @ApiProperty({ example: '14.12' })
  @Column({ type: 'varchar', length: 100 })
  lng: string;

  @ApiProperty({ example: 6 })
  @Column({ type: 'tinyint', default: 6 })
  zoom: number;

  @ApiProperty({ example: false })
  @Column({ type: 'boolean', default: false })
  active: boolean;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
