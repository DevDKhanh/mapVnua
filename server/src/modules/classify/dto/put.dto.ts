import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateClassifyDto {
  @ApiProperty({ example: 'tên lớp' })
  @IsString()
  nameClassify: string;

  @ApiProperty({ example: 'en' })
  @IsString()
  languageId: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  active: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  no: number;
}
