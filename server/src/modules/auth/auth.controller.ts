import { Body, Controller, Get, Post } from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto, ResLoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
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
}
