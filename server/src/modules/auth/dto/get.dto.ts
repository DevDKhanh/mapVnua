import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { ResPaginationDto } from 'src/common/text.helper';
import { UserEntity } from '../entities/user.entity';

export class GetListUserDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  page: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  pageSize: number;
}

export class ResGetListUserDto extends ResPaginationDto {
  @ApiProperty({ type: [UserEntity] })
  records: UserEntity[];
}
