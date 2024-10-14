import { PrismaService } from 'src/prisma/prisma.service';
import { Refresh } from '../interfaces/refresh.interface';
export declare class AuthRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    deleteRefresh(token: string): Promise<Refresh>;
    findRefreshByAdminID(adminId: string): Promise<Refresh>;
    updateOrCreateRefresh(oldToken: string, newToken: string, adminId: string, exp: Date): Promise<Refresh>;
}
