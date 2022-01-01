import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

//   import { AdminAuthGuard, JwtAuthGuard } from '../auth/jwt.strategy';
import { GetListUserDto, ResGetListUserDto } from './dto/get.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth api . Vòng quay')
@ApiConsumes('Auth Api')
@ApiBearerAuth()
@Controller('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  @ApiOperation({
    summary: 'Get list user . Lấy danh sách user',
  })
  // @UseGuards(AdminAuthGuard)
  @HttpCode(200)
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: ResGetListUserDto, status: 200 })
  async getList(@Query() getListUserDto: GetListUserDto) {
    return this.authService.getList(getListUserDto);
  }
}
