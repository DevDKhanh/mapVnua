import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAreaDto {
  @ApiProperty({ example: 'idkhuvuc' })
  @IsString()
  @IsOptional()
  idArea: string;

  @ApiProperty({ example: 'tên Khu vực' })
  @IsString()
  @IsOptional()
  nameArea: string;

  @ApiProperty({ example: 'en' })
  @IsString()
  @IsOptional()
  languageId: string;

  @ApiProperty({ example: 15.14 })
  @IsNumber()
  @IsOptional()
  lat: number;

  @ApiProperty({ example: 50.14 })
  @IsNumber()
  @IsOptional()
  lng: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  active: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsOptional()
  zoom: number;
}
