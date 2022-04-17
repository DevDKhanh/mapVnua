import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDisplayDto {
  @ApiProperty({ example: 'TIEU_DE_MAP' })
  @IsString()
  keyword: string;

  @ApiProperty({ example: 'en' })
  @IsString()
  languageId: string;

  @ApiProperty({ example: 'Bản đồ - develop by teamVnua' })
  @IsString()
  trans: string;
}
