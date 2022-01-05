import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateLayerDto {
  @ApiProperty({ example: 'tên Lớp' })
  @IsString()
  nameLayer: string;

  @ApiProperty({ example: 'en' })
  @IsString()
  languageId: string;

  @ApiProperty({ example: 'abcde' })
  @IsString()
  classifyId: string;

  @ApiProperty({ example: 'abcde' })
  @IsString()
  areaId: string;

  @ApiProperty({ example: 'vector' })
  @IsString()
  style: string;

  @ApiProperty({ example: './upload/abc.json' })
  @IsString()
  path: string;

  @ApiProperty({ example: 'abc.img' })
  @IsString()
  icon: string;

  @ApiProperty({ example: '#00000' })
  @IsString()
  borderColor: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  widthBorder: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  opacityBorder: number;

  @ApiProperty({ example: '#0f0' })
  @IsString()
  backgroundColor: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  opacityBackground: number;

  @ApiProperty({ example: 15.14 })
  @IsNumber()
  latSW: number;

  @ApiProperty({ example: 50.14 })
  @IsNumber()
  lngSW: number;

  @ApiProperty({ example: 15.14 })
  @IsNumber()
  latNE: number;

  @ApiProperty({ example: 50.14 })
  @IsNumber()
  lngNE: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  active: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  zIndex: number;
}
