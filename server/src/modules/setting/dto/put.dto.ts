import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { CreateSettingDto } from './post.dto';

export class UpdateSettingDto extends PartialType(CreateSettingDto) {
  @ApiProperty({ example: false })
  @IsBoolean()
  active: boolean;
}
