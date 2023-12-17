import { IsInt, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class Pagination {
  @ApiProperty({ example: 1 })
  @IsInt()
  page: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  pageSize: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsOptional()
  type: number;
}

export class GetListDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  page: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  pageSize: number;

  @ApiProperty({ example: '7', required: false })
  @IsString()
  @IsOptional()
  langId: string;

  @ApiProperty({ example: ' ', required: false })
  @IsString()
  @IsOptional()
  keyword: string;

  @ApiProperty({
    example: '88c2598d-5280-4ab4-bd82-214862cde7f9',
    required: false,
  })
  @IsString()
  @IsOptional()
  areaId: string;

  @ApiProperty({
    example: '9eb6cf8e-129d-4774-92a0-d58d81519d7a',
    required: false,
  })
  @IsString()
  @IsOptional()
  classifyId: string;
}

export class GetLayerDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  page: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  pageSize: number;

  @ApiProperty({ example: '7' })
  @IsString()
  @IsOptional()
  langId: string;

  @ApiProperty({ example: '88c2598d-5280-4ab4-bd82-214862cde7f9' })
  @IsString()
  @IsOptional()
  areaId: string;

  @ApiProperty({ example: '9eb6cf8e-129d-4774-92a0-d58d81519d7a' })
  @IsString()
  @IsOptional()
  classifyId: string;
}
