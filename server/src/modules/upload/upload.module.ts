import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UploadEntity } from './entities/upload.entity';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([UploadEntity])],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
