import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'admin' })
  @IsString()
  userName: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;
}
export class ResLoginUserDto {
  @ApiProperty({ example: 'token' })
  token: string;

  @ApiProperty({ example: '1a582fb0-301e-4f66-8a84-2b05dee44107' })
  id: string;

  @ApiProperty({ example: 'Trần Duy Khánh' })
  fullName: string;

  @ApiProperty({ example: 'admin' })
  userName: string;

  @ApiProperty({ example: 1 })
  role: number;
}
