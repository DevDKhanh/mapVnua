import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDisplayDto {
  @ApiProperty({ example: 'TIEU_DE_MAP' })
  @IsString()
  @IsOptional()
  keyword: string;

  @ApiProperty({ example: 'en' })
  @IsString()
  @IsOptional()
  languageId: string;

  @ApiProperty({ example: 'Bản đồ - develop by teamVnua' })
  @IsString()
  @IsOptional()
  trans: string;
}
