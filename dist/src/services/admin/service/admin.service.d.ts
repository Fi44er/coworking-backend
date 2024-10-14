import { Admin } from '@prisma/client';
import { AdminRepository } from '../repository/admin.repository';
export declare class AdminService {
    private readonly adminRepository;
    constructor(adminRepository: AdminRepository);
    save(admin: Partial<Admin>): Promise<import("../interface/admin.interface").IAdmin>;
    findOneAdmin(idOrLogin: string): Promise<import("../interface/admin.interface").IAdmin>;
    private hashPassword;
}
