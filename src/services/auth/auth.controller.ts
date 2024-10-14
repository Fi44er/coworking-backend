import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { LoginAdminDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { Cookie } from 'lib/decorators/cookies.decorator';
import { Tokens } from './interfaces/token.interface';
import { Response } from 'express';
import { Public } from 'lib/decorators/public.decorator';
import { ApiTags, ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';

const ACCESS_TOKEN = 'accesstoken';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginAdminDto })
  @ApiResponse({ status: 201, description: 'Login successful' })
  async Login(
    @Body() dto: LoginAdminDto,
    @Res() res: Response,
  ): Promise<Response> {
    const tokens = await this.authService.login(dto);

    return this.setRefreshTokenToCookie(tokens, res);
  }

  @Get('logout')
  @ApiOperation({ summary: 'Logout' })
  async logout(
    @Cookie(ACCESS_TOKEN) refreshToken: string,
    @Res() res: Response,
  ): Promise<Response> {
    if (!refreshToken) return res.sendStatus(HttpStatus.OK);
    await this.authService.deleteRefreshToken(refreshToken);
    res.cookie(ACCESS_TOKEN, '', {
      httpOnly: false,
      secure: false,
      expires: new Date(),
    });
    return res.sendStatus(HttpStatus.OK);
  }

  @Get('refresh-tokens')
  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiResponse({ status: 201, description: 'Tokens refreshed' })
  async refreshToken(
    @Cookie(ACCESS_TOKEN) refreshToken: string,
    @Res() res: Response,
  ): Promise<Response> {
    if (!refreshToken || typeof refreshToken !== 'string')
      throw new UnauthorizedException();
    const tokens = await this.authService.refreshTokens(refreshToken);
    if (!tokens) throw new UnauthorizedException();
    return this.setRefreshTokenToCookie(tokens, res);
  }

  private setRefreshTokenToCookie(tokens: Tokens, res: Response): Response {
    if (!tokens) throw new UnauthorizedException();

    res.cookie(ACCESS_TOKEN, tokens.token, {
      httpOnly: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + tokens.exp),
      secure:
        this.configService.get('NODE_ENV', 'development') === 'production',
      path: '/',
    });

    return res.status(HttpStatus.CREATED).json({ accessToken: tokens.token });
  }
}
