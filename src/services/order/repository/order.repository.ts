import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ICreateOrder,
  IExistingOrdersTime,
  IOrder,
  IUpdateOrder,
} from '../interface/order.interface';

@Injectable()
export class OrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(order: ICreateOrder): Promise<IOrder> {
    return this.prismaService.order.create({ data: order });
  }

  async findAll(): Promise<IOrder[]> {
    return this.prismaService.order.findMany();
  }

  async findByRoomID(id: number): Promise<IOrder[]> {
    return this.prismaService.order.findMany({ where: { roomId: id } });
  }

  async findByID(id: number): Promise<IOrder> {
    return this.prismaService.order.findUnique({ where: { id } });
  }

  async findExistingOrdersTime(
    roomId: number,
    id?: number,
  ): Promise<IExistingOrdersTime[]> {
    return this.prismaService.order.findMany({
      where: {
        roomId: roomId,
        NOT: {
          id: id ?? undefined,
        },
      },
      select: {
        timeStart: true,
        timeEnd: true,
      },
    });
  }

  async update(data: IUpdateOrder): Promise<IOrder> {
    return this.prismaService.order.update({ where: { id: data.id }, data });
  }

  async delete(id: number): Promise<IOrder> {
    return this.prismaService.order.delete({ where: { id } });
  }

  async deleteOverdueOrders() {
    await this.prismaService.order.deleteMany({
      where: {
        timeEnd: {
          lte: new Date(),
        },
      },
    });
  }
}
