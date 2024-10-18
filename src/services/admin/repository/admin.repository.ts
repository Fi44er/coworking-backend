import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IAdmin, ICreate } from '../interface/admin.interface';

@Injectable()
export class AdminRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findIdOrLogin(idOrLogin: string): Promise<IAdmin> {
    return this.prismaService.admin.findFirst({
      where: {
        OR: [
          {
            id: idOrLogin,
          },
          {
            login: idOrLogin,
          },
        ],
      },
    });
  }

  async create(admin: ICreate): Promise<IAdmin> {
    return this.prismaService.admin.create({
      data: {
        login: admin.login,
        password: admin.password,
      },
    });
  }
}
