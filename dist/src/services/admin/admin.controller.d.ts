import { AdminService } from './service/admin.service';
import { CreateAdminDto } from './dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    save(dto: CreateAdminDto): Promise<import("./interface/admin.interface").IAdmin>;
    findOneAdmin(idOrLogin: string): Promise<import("./interface/admin.interface").IAdmin>;
}
