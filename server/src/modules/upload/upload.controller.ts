import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Pagination } from 'src/common/dto/index.dto';
import {
  PermisionUploadGuard,
  PermisionDeleteGuard,
} from '../auth/jwt.strategy';
import { QueryDelete } from './dto/upload.dto';
import { UploadService } from './upload.service';

const optionsImage = {
  storage: diskStorage({
    destination: './uploads/image',
    filename: (req: any, file: any, cb: any) => {
      const [nameFile, fileExtension] = file.originalname.split('.');
      const newName = `${nameFile}_${Date.now()}.${fileExtension}`;
      cb(null, newName);
    },
  }),
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif|svg\+xml|)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Không chấp nhận file ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
};

const optionsFile = {
  storage: diskStorage({
    destination: './uploads/file',
    filename: (req: any, file: any, cb: any) => {
      const [nameFile, fileExtension] = file.originalname.split('.');
      const newName = `${nameFile}_${Date.now()}.${fileExtension}`;
      cb(null, newName);
    },
  }),
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(json)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Không chấp nhận file ${extname(
            file.originalname,
          )}. Chỉ chấp nhận file .json`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
};

@ApiTags('Upload File')
@ApiConsumes('Upload File')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get path files' })
  async getPathFiles(@Query() getListDto: Pagination) {
    return this.uploadService.getPathFiles(getListDto);
  }

  @Delete('/')
  @ApiOperation({ summary: 'Delete file' })
  @UseGuards(PermisionDeleteGuard)
  async delete(@Query() queryDelete: QueryDelete) {
    return this.uploadService.delete(queryDelete);
  }

  @Post('/image')
  @UseGuards(PermisionUploadGuard)
  @ApiOperation({ summary: 'Upload image Api ' })
  @UseInterceptors(FileInterceptor('file', optionsImage))
  async upload(@UploadedFile('file') file) {
    return this.uploadService.savePath(`/image/${file.filename}`, 0);
  }

  @Post('/file')
  @UseGuards(PermisionUploadGuard)
  @ApiOperation({ summary: 'Upload file Api ' })
  @UseInterceptors(FileInterceptor('file', optionsFile))
  async uploadFile(@UploadedFile('file') file): Promise<{ filename: any }> {
    return this.uploadService.savePath(`/file/${file.filename}`, 1);
  }

  @Get('/image/:name')
  @ApiOperation({ summary: 'Get image Api ' })
  async getImage(@Res() res, @Param('name') nameFile: string) {
    return res.sendFile(nameFile, { root: './uploads/image' });
  }

  @Get('/file/:name')
  @ApiOperation({ summary: 'Get file Api ' })
  async getFile(@Res() res, @Param('name') nameFile: string) {
    return res.sendFile(nameFile, { root: './uploads/file' });
  }
}
