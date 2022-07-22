import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tbltep' })
export class UploadEntity {
  @ApiProperty({ description: 'id ' })
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ApiProperty({ description: 'typeFile ' })
  @Column({ type: 'tinyint', name: 'kieuTep', default: 0 })
  typeFile: number;

  @ApiProperty()
  @Column({
    type: 'text',
    name: 'duongDan',
  })
  path: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
