import { Admin } from "@prisma/client";
export declare class AdminResponse implements Admin {
    id: string;
    login: string;
    password: string;
}
