import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from '../admin/admin.module';
import { STRATEGIES } from './strategies';
import { GUARDS } from './guards';
import { options } from './config';
import { AuthRepository } from './repository/auth.repository';

@Module({
  imports: [PassportModule, JwtModule.registerAsync(options()), AdminModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, ...STRATEGIES, ...GUARDS],
})
export class AuthModule {}
