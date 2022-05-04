import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLanguageDto {
  @ApiProperty({ example: 'DH_ABC' })
  @IsString()
  idLanguage: string;

  @ApiProperty({ example: 'Tiếng việt' })
  @IsString()
  nameLanguage: string;

  @ApiProperty({ example: 'abc.jpg' })
  @IsString()
  icon: string;
}
