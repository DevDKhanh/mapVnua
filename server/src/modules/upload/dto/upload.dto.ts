import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class QueryDelete {
  @ApiProperty({ example: 'abc' })
  @IsString()
  id: string;
}
