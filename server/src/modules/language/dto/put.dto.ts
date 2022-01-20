import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateLanguageDto {
  @ApiProperty({ example: 'Tiếng việt' })
  @IsString()
  @IsOptional()
  nameLanguage: string;

  @ApiProperty({ example: 'image.jpg' })
  @IsString()
  @IsOptional()
  icon: string;
}
