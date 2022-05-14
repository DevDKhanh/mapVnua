import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class GetListDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  page: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  pageSize: number;

  @ApiProperty({ example: 'vi' })
  @IsString()
  @IsOptional()
  langId: string;

  @ApiProperty({ example: 'vihhh' })
  @IsString()
  @IsOptional()
  areaId: string;
}

export class GetLayerDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  page: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  pageSize: number;

  @ApiProperty({ example: 'vi' })
  @IsString()
  @IsOptional()
  langId: string;

  @ApiProperty({ example: 'vihhh' })
  @IsString()
  @IsOptional()
  areaId: string;

  @ApiProperty({ example: 'vihhh' })
  @IsString()
  @IsOptional()
  classifyId: string;
}
