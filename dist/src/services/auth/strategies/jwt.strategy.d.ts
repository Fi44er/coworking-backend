import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AdminService } from 'src/services/admin/service/admin.service';
import { jwtPayload } from '../interfaces/jwt-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly adminService;
    private readonly logger;
    constructor(configService: ConfigService, adminService: AdminService);
    validate(payload: jwtPayload): Promise<boolean>;
}
export {};
