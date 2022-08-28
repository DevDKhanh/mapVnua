import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLayerDto {
  @ApiProperty({ example: 'tên Lớp' })
  @IsString()
  @IsOptional()
  nameLayer: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  languageId: number;

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

  @ApiProperty({ example: 'XOI_MON_S1' })
  @IsString()
  @IsOptional()
  keyColor: string;

  @ApiProperty({ example: 'XOI_MON_S1' })
  @IsString()
  @IsOptional()
  titleNote: string;

  @ApiProperty({
    example:
      '#36fa00|0_10:#26c3f7|10_20:#4854f9|20_30:#d36cf9|30_40:#f96ccc|40_100:#fcb6b6|100_700',
  })
  @IsString()
  @IsOptional()
  dataColor: string;

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
  typeColor: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  active: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  @IsOptional()
  checked: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  activeNote: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  activeTooltip: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsOptional()
  zIndex: number;
}
