import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLayerDto {
  @ApiProperty({ example: 'tên Lớp' })
  @IsString()
  @IsOptional()
  nameLayer: string;

  @ApiProperty({ example: 'en' })
  @IsString()
  @IsOptional()
  languageId: string;

  @ApiProperty({ example: 'abcde' })
  @IsString()
  @IsOptional()
  classifyId: string;

  @ApiProperty({ example: 'abcde' })
  @IsString()
  @IsOptional()
  areaId: string;

  @ApiProperty({ example: 'vector' })
  @IsString()
  @IsOptional()
  style: string;

  @ApiProperty({ example: './upload/abc.json' })
  @IsString()
  @IsOptional()
  path: string;

  @ApiProperty({ example: 'abc.img' })
  @IsString()
  @IsOptional()
  icon: string;

  @ApiProperty({ example: '#00000' })
  @IsString()
  @IsOptional()
  borderColor: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsOptional()
  widthBorder: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsOptional()
  opacityBorder: number;

  @ApiProperty({ example: '#0f0' })
  @IsString()
  @IsOptional()
  backgroundColor: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsOptional()
  opacityBackground: number;

  @ApiProperty({ example: 15.14 })
  @IsNumber()
  @IsOptional()
  latSW: number;

  @ApiProperty({ example: 50.14 })
  @IsNumber()
  @IsOptional()
  lngSW: number;

  @ApiProperty({ example: 15.14 })
  @IsNumber()
  @IsOptional()
  latNE: number;

  @ApiProperty({ example: 50.14 })
  @IsNumber()
  @IsOptional()
  lngNE: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  active: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsOptional()
  zIndex: number;
}
