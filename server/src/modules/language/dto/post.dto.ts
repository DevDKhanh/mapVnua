import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLanguageDto {
  @ApiProperty({ example: 'vi' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Tiếng việt' })
  @IsString()
  nameLanguage: string;

  @ApiProperty({ example: 'abc.jpg' })
  @IsString()
  icon: string;
}
