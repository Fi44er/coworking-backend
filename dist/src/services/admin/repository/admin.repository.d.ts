import { PrismaService } from 'src/prisma/prisma.service';
import { IAdmin, ICreate } from '../interface/admin.interface';
export declare class AdminRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findIdOrLogin(idOrLogin: string): Promise<IAdmin>;
    create(admin: ICreate): Promise<IAdmin>;
}
