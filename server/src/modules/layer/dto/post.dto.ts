import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateLayerDto {
  // @ApiProperty({ example: 'id Lớp' })
  // @IsString()
  // id: string;

  @ApiProperty({ example: 'tên Lớp' })
  @IsString()
  nameLayer: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  languageId: number;

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

  @ApiProperty({ example: 'XOI_MON_S1' })
  @IsString()
  keyColor: string;

  @ApiProperty({ example: 'XOI_MON_S1' })
  @IsOptional()
  @IsString()
  titleNote: string;

  @ApiProperty({
    example:
      '#36fa00|0_10:#26c3f7|10_20:#4854f9|20_30:#d36cf9|30_40:#f96ccc|40_100:#fcb6b6|100_700',
  })
  @IsString()
  dataColor: string;

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

  @ApiProperty({ example: 1 })
  @IsNumber()
  typeColor: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  checked: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  activeNote: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  activeTooltip: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  zIndex: number;
}
