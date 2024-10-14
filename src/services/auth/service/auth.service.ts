import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginAdminDto } from '../dto';
import { AdminService } from '../../admin/service/admin.service';
import { compareSync } from 'bcrypt';
import { v4 } from 'uuid';
import { add } from 'date-fns';
import { Tokens } from '../interfaces/token.interface';
import { JwtService } from '@nestjs/jwt';
import { Admin, Token } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { convertToMilisecondsUtil } from 'lib/utils/convertToMiliseconds.util';
import { AuthRepository } from '../repository/auth.repository';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly configService: ConfigService,
    private readonly authRepository: AuthRepository,
  ) {}

  async login(dto: LoginAdminDto): Promise<Tokens> {
    const admin = await this.adminService
      .findOneAdmin(dto.login)
      .catch((err) => {
        this.logger.error(err);
        return null;
      });

    if (!admin || !compareSync(dto.password, admin.password))
      throw new UnauthorizedException('Не верный логин или пароль');
    const tokens = this.generateTokens(admin);
    if (!tokens)
      throw new BadRequestException('Unable to log in with the provided data');
    return tokens;
  }

  // Если refresh токен есть в бд, удаляет его и генерирует новую пару accsess и refresh
  async refreshTokens(refreshToken: string): Promise<Tokens> {
    const token = await this.authRepository.deleteRefresh(refreshToken);
    if (!token || new Date(token.exp) < new Date())
      throw new UnauthorizedException();

    const user = await this.adminService.findOneAdmin(String(token.adminId));
    return this.generateTokens(user);
  }

  // Генерация пары accsess и refresh токенов
  private async generateTokens(user: Admin): Promise<Tokens> {
    const accessToken =
      'Bearer ' +
      this.jwtService.sign({
        id: user.id,
        login: user.login,
      });
    const exp = this.configService.get('JWT_EXP') ?? '1d';
    const accessExp = convertToMilisecondsUtil(exp);
    await this.getRefreshToken(user.id);
    return { token: accessToken, exp: accessExp };
  }

  // Генерация refresh токена
  private async getRefreshToken(adminId: string): Promise<Token> {
    const _token = await this.authRepository.findRefreshByAdminID(adminId);
    const token = _token?.token ?? '';
    return await this.authRepository.updateOrCreateRefresh(
      token,
      v4(),
      adminId,
      add(new Date(), { months: 1 }),
    );
  }

  // Удаление refresh токена
  async deleteRefreshToken(token: string) {
    return await this.authRepository.deleteRefresh(token);
  }
}
