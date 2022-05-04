import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDisplayDto {
  @ApiProperty({ example: 'TIEU_DE_MAP' })
  @IsString()
  keyword: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  languageId: number;

  @ApiProperty({ example: 'Bản đồ - develop by teamVnua' })
  @IsString()
  trans: string;
}
