import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateSettingDto {
  @ApiProperty({ example: 'vi' })
  @IsString()
  language: string;

  @ApiProperty({ example: 'Bản đồ Hà Nội' })
  @IsString()
  title: string;

  @ApiProperty({ example: '50.12' })
  @IsString()
  lat: string;

  @ApiProperty({ example: '14.12' })
  @IsString()
  lng: string;

  @ApiProperty({ example: 6 })
  @IsNumber()
  zoom: number;
}
