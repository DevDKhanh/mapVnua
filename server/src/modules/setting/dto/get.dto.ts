import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class GetListSettingDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  page: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  pageSize: number;
}
