import { ApiProperty } from "@nestjs/swagger";
import { Admin } from "@prisma/client";

export class AdminResponse implements Admin {
    @ApiProperty()
    id: string;

    @ApiProperty()
    login: string;

    @ApiProperty()
    password: string;
}
