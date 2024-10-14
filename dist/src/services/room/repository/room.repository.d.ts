import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateRoom, IRoom, IRoomResponse, IUpdateRoom } from '../interface/roomInterface';
export declare class RoomRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(data: ICreateRoom): Promise<IRoom>;
    findMany(): Promise<IRoomResponse[]>;
    findByID(id: number): Promise<IRoomResponse>;
    update(id: number, dto: IUpdateRoom): Promise<IRoom>;
    delete(id: number): Promise<IRoom>;
}
