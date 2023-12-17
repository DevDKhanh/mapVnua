import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateMapBaseDto {
  @ApiProperty({ example: 'ABC' })
  @IsNotEmpty()
  @IsString()
  ten: string;

  @ApiProperty({ example: 'ABC' })
  @IsNotEmpty()
  @IsString()
  urlImage: string;

  @ApiProperty({ example: 'ABC' })
  @IsNotEmpty()
  @IsString()
  url: string;
}
