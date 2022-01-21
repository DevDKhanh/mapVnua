import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { AdminAuthGuard } from '../auth/jwt.strategy';

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
    console.log(file.mimetype);
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
    console.log(file.mimetype);
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
  @Post('/image')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'Upload image Api ' })
  @UseInterceptors(FileInterceptor('file', optionsImage))
  async upload(@UploadedFile('file') file): Promise<{ filename: any }> {
    return { filename: `/image/${file.filename}` };
  }

  @Post('/file')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'Upload file Api ' })
  @UseInterceptors(FileInterceptor('file', optionsFile))
  async uploadFile(@UploadedFile('file') file): Promise<{ filename: any }> {
    return { filename: `/file/${file.filename}` };
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
