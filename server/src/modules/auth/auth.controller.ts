import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetListDto } from '../../common/dto/index.dto';
import { AuthService } from './auth.service';
import { LoginUserDto, ResLoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { AdminAuthGuard } from './jwt.strategy';
import { UpdateUserDto } from '../users/dto/put.dto';

@ApiTags('Auth Api')
@ApiConsumes('Auth Api')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Register user' })
  @ApiOkResponse({ type: RegisterUserDto, status: 201 })
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user Api' })
  @ApiOkResponse({ type: ResLoginUserDto, status: 200 })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('/users')
  @HttpCode(200)
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'Get list Users . SPAdmin' })
  async getList(@Query() getListDto: GetListDto) {
    return this.authService.getList(getListDto);
  }

  @Get('/users/user/:id')
  @HttpCode(200)
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'Get detail User . SPAdmin' })
  async getDetail(@Param('id') id: string) {
    return this.authService.getDetail(id);
  }

  @Put('/users/user/:id')
  @HttpCode(200)
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'Update User . SPAdmin' })
  @ApiOkResponse({ type: UpdateUserDto, status: 200 })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(id, updateUserDto);
  }

  @Delete('/users/user/:id')
  @HttpCode(200)
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'Delete User . SPAdmin' })
  async delete(@Param('id') id: string) {
    return this.authService.delete(id);
  }
}
