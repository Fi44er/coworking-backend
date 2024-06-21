import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminService } from 'src/services/admin/admin.service';
import { jwtPayload } from '../interfaces/jwt-payload.interface';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly adminService: AdminService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validateToken(token: string) {
    try {
      console.log(token);

      // const decoded: jwtPayload = jwt.verify(token, this.configService.get('JWT_SECRET'));
      const decoded: jwtPayload = jwt.verify(
        token,
        this.configService.get('JWT_SECRET'),
      ) as jwtPayload;

      console.log(decoded);

      // payload токена(id, login, roles)
      const user = await this.adminService.findOneAdmin(String(decoded.id));
      if (!user) {
        throw new UnauthorizedException();
      }
      return decoded;
    } catch (err) {
      console.log(err);

      throw new UnauthorizedException();
    }
  }
}
