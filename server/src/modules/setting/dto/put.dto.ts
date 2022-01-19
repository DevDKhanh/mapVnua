import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateSettingDto } from './post.dto';

export class UpdateSettingDto {
  @ApiProperty({ example: 'en' })
  @IsString()
  @IsOptional()
  languageId: string;

  @ApiProperty({ example: 'Bản đồ Hà Nội' })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({ example: 15.14 })
  @IsNumber()
  @IsOptional()
  lat: number;

  @ApiProperty({ example: 50.14 })
  @IsNumber()
  @IsOptional()
  lng: number;

  @ApiProperty({ example: 6 })
  @IsNumber()
  @IsOptional()
  zoom: number;

  @ApiProperty({ example: 'image.jpg' })
  @IsString()
  @IsOptional()
  icon: string;
}
