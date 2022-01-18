import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class RegisterUserDto {
  @ApiProperty({ example: 'userName' })
  @IsString()
  userName: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'Trần Duy Khánh' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: 0 })
  @IsNumber()
  role: number;
}
