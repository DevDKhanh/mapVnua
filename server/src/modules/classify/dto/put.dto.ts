import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateClassifyDto {
  @ApiProperty({ example: 'tên lớp' })
  @IsString()
  @IsOptional()
  nameClassify: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  languageId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  active: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  no: number;
}
