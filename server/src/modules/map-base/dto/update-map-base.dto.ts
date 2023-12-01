import { PartialType } from '@nestjs/swagger';
import { CreateMapBaseDto } from './create-map-base.dto';

export class UpdateMapBaseDto extends PartialType(CreateMapBaseDto) {}
