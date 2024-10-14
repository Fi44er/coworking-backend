import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminService } from 'src/services/admin/service/admin.service';
import { jwtPayload } from '../interfaces/jwt-payload.interface';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly adminService: AdminService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const token = request.cookies.accesstoken;
          return token ? token.split(' ')[1] : null;
        },
      ]),

      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: jwtPayload) {
    const user = await this.adminService
      .findOneAdmin(payload.id.toString())
      .catch((err) => {
        this.logger.error(err);
        return null;
      });
    if (!user) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
