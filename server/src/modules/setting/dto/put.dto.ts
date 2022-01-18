import { PartialType } from '@nestjs/swagger';
import { CreateSettingDto } from './post.dto';

export class UpdateSettingDto extends PartialType(CreateSettingDto) {}
