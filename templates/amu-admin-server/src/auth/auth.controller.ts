import { Body, Controller, Get, Headers, Post, Req, UnauthorizedException } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Public } from '../common/decorators/public.decorator'
import type { AuthenticatedRequest } from '../common/interfaces/authenticated-request'
import { LoginDto } from './dto/login.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { AuthService } from './auth.service'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.username, body.password)
  }

  @Public()
  @Post('refresh')
  async refresh(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken)
  }

  @ApiBearerAuth()
  @Get('profile')
  async profile(@Req() request: AuthenticatedRequest) {
    return this.authService.getProfile(request.authUser!.id)
  }

  @ApiBearerAuth()
  @Post('logout')
  async logout(@Headers('authorization') authorizationHeader?: string) {
    const accessToken = authorizationHeader?.replace(/^Bearer\s+/i, '')
    if (!accessToken) {
      throw new UnauthorizedException('缺少访问令牌')
    }
    return this.authService.logout(accessToken)
  }
}
