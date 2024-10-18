import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Refresh } from '../interfaces/refresh.interface';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async deleteRefresh(token: string): Promise<Refresh> {
    return this.prismaService.token.delete({ where: { token } });
  }

  async findRefreshByAdminID(adminId: string): Promise<Refresh> {
    return this.prismaService.token.findFirst({ where: { adminId } });
  }

  async updateOrCreateRefresh(
    oldToken: string,
    newToken: string,
    adminId: string,
    exp: Date,
  ): Promise<Refresh> {
    return this.prismaService.token.upsert({
      where: { token: oldToken },
      update: {
        token: newToken,
        exp,
      },
      create: {
        token: newToken,
        exp,
        adminId,
      },
    });
  }
}
