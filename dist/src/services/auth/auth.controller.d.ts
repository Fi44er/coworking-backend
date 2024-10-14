import { AuthService } from './service/auth.service';
import { LoginAdminDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    private readonly configService;
    constructor(authService: AuthService, configService: ConfigService);
    Login(dto: LoginAdminDto, res: Response): Promise<Response>;
    logout(refreshToken: string, res: Response): Promise<Response>;
    refreshToken(refreshToken: string, res: Response): Promise<Response>;
    private setRefreshTokenToCookie;
}
