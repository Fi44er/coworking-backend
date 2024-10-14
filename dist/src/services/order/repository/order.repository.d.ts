import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateOrder, IExistingOrdersTime, IOrder, IUpdateOrder } from '../interface/order.interface';
export declare class OrderRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(order: ICreateOrder): Promise<IOrder>;
    findAll(): Promise<IOrder[]>;
    findByRoomID(id: number): Promise<IOrder[]>;
    findByID(id: number): Promise<IOrder>;
    findExistingOrdersTime(roomId: number, id?: number): Promise<IExistingOrdersTime[]>;
    update(data: IUpdateOrder): Promise<IOrder>;
    delete(id: number): Promise<IOrder>;
    deleteOverdueOrders(): Promise<void>;
}
