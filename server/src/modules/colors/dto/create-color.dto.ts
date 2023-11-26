import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateColorDto {
  @ApiProperty({ example: 'ABC' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ example: 'Description' })
  @IsString()
  description: string;

  @ApiProperty({ example: 255 })
  @IsNotEmpty()
  @IsInt()
  red: number;

  @ApiProperty({ example: 255 })
  @IsNotEmpty()
  @IsInt()
  green: number;

  @ApiProperty({ example: 255 })
  @IsNotEmpty()
  @IsInt()
  blue: number;
}

export class SearchColorsDto {
  @ApiProperty({
    example: [{ value: 'string', color: 'string', note: 'string' }],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  data: { value: string; color: string; note: string }[];
}
