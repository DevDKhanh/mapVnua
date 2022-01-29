import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AdminAuthGuard } from '../auth/jwt.strategy';
import { AddPermissionAdminDto } from './dto/post.dto';
import { PermissionService } from './permission.service';
@ApiTags('Phân quyền admin')
@ApiConsumes('Phân quyền admin')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post('/:id')
  @ApiOperation({
    description: ' SPadmin thêm quyền cho admin',
  })
  @UseGuards(AdminAuthGuard)
  @HttpCode(200)
  @ApiOkResponse({ status: 200, type: null })
  async create(
    @Body() addPermissionAdminDto: AddPermissionAdminDto,
    @Param('id') id: string,
  ) {
    return this.permissionService.create(id, addPermissionAdminDto);
  }
}
