import { LoginAdminDto } from '../dto';
import { AdminService } from '../../admin/service/admin.service';
import { Tokens } from '../interfaces/token.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthRepository } from '../repository/auth.repository';
export declare class AuthService {
    private readonly jwtService;
    private readonly adminService;
    private readonly configService;
    private readonly authRepository;
    private readonly logger;
    constructor(jwtService: JwtService, adminService: AdminService, configService: ConfigService, authRepository: AuthRepository);
    login(dto: LoginAdminDto): Promise<Tokens>;
    refreshTokens(refreshToken: string): Promise<Tokens>;
    private generateTokens;
    private getRefreshToken;
    deleteRefreshToken(token: string): Promise<import("../interfaces/refresh.interface").Refresh>;
}
