import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateAreaDto {
  @ApiProperty({ example: 'tên Khu vực' })
  @IsString()
  nameArea: string;

  @ApiProperty({ example: 'en' })
  @IsString()
  languageId: string;

  @ApiProperty({ example: 15.14 })
  @IsNumber()
  lat: number;

  @ApiProperty({ example: 50.14 })
  @IsNumber()
  lng: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  active: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  zoom: number;
}
