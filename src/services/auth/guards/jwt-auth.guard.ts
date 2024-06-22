import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { isPublic } from 'lib/decorators/public.decorator';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    // private readonly configService: ConfigService,
    // private readonly adminService: AdminService,
  ) {
    super();
  }

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const _isPublic = isPublic(ctx, this.reflector);
    if (_isPublic) {
      return true;
    }
    // const request = ctx.switchToHttp().getRequest();
    // const token = request.cookies['accesstoken'];

    // this.validateToken(token);
    return super.canActivate(ctx);
  }

  // async validateToken(token: string) {
  //   console.log(token);
  //   token = token.replace('Bearer ', '');
  //   try {
  //     console.log(token);
  //     const decoded: jwtPayload = jwt.verify(
  //       token,
  //       this.configService.get('JWT_SECRET'),
  //     ) as jwtPayload;
  //     // payload токена(id, login, roles)
  //     // const user = await this.adminService.findOneAdmin(String(decoded.id));
  //     // if (!user) {
  //     //   throw new UnauthorizedException();
  //     // }
  //     return true;
  //   } catch (err) {
  //     console.log(err);
  //     throw new UnauthorizedException();
  //   }
  // }
}
