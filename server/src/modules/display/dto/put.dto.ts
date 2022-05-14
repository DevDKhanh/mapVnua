import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDisplayDto {
  @ApiProperty({ example: 'TIEU_DE_MAP' })
  @IsString()
  @IsOptional()
  keyword: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  languageId: number;

  @ApiProperty({ example: 'Bản đồ - develop by teamVnua' })
  @IsString()
  @IsOptional()
  trans: string;
}
