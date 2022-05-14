import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateSettingDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  languageId: number;

  @ApiProperty({ example: 'Bản đồ Hà Nội' })
  @IsString()
  title: string;

  @ApiProperty({ example: 15.14 })
  @IsNumber()
  lat: number;

  @ApiProperty({ example: 50.14 })
  @IsNumber()
  lng: number;

  @ApiProperty({ example: 6 })
  @IsNumber()
  zoom: number;

  @ApiProperty({ example: 'image.jpg' })
  @IsString()
  icon: string;
}
