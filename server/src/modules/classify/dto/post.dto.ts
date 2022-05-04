import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateClassifyDto {
  @ApiProperty({ example: 'id phân loại' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'tên lớp' })
  @IsString()
  nameClassify: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  languageId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  active: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  no: number;
}
