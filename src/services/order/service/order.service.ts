import { BadRequestException, Injectable } from '@nestjs/common';
import { countingTimeEnd } from 'lib/utils/convert-to-time.util';
import { convertStringToTime } from 'lib/utils/convertStringToDate.util';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrderResponse } from '../response/order.response';
import { EmailService } from 'src/services/mailer/mailer.service';
import { OrderRepository } from '../repository/order.repository';
import { RoomService } from 'src/services/room/service/room.service';
import { CreateOrderDto, FilterOrdersQueryDto, UpdateOrderDto } from '../dto';
import { checkingFreeTime, sortingOrdersByTime } from '../utils/utils';
import { ICreateOrder } from '../interface/order.interface';

@Injectable()
export class OrderService {
  constructor(
    private readonly emailService: EmailService,
    private readonly orderRepository: OrderRepository,
    private readonly roomService: RoomService,
  ) {}

  // ------------------------------ Order ------------------------------ //

  // --------------- Create Order --------------- //
  async createOrder(dto: CreateOrderDto): Promise<OrderResponse> {
    const room = await this.roomService.getById(dto.roomId);
    if (!room) throw new BadRequestException('Такой комнаты несуществует');
    const timeEnd = countingTimeEnd(dto.timeStart, dto.duration);

    const existOrdersTime = await this.orderRepository.findExistingOrdersTime(
      dto.roomId,
    );

    checkingFreeTime(new Date(dto.timeStart), timeEnd, room, existOrdersTime);

    const { timeStart, ...rest } = dto;
    const data: ICreateOrder = {
      ...rest,
      timeStart: new Date(timeStart),
      timeEnd,
    };

    const order = await this.orderRepository.create(data);

    await this.emailService.sendEmail(order);

    return order;
  }

  // --------------- Get All Order --------------- //
  async getAllOrders(query: FilterOrdersQueryDto): Promise<OrderResponse[]> {
    const { roomId, time } = query;
    let orders: OrderResponse[] = [];
    if (roomId) {
      orders = await this.orderRepository.findByRoomID(roomId);
    } else {
      orders = await this.orderRepository.findAll();
    }

    sortingOrdersByTime(time, orders);

    return orders;
  }

  // --------------- Get Order by id --------------- //
  async getOrderById(id: number): Promise<OrderResponse> {
    const order = await this.orderRepository.findByID(id);
    if (!order) throw new BadRequestException('Такой заявки не существует');
    return order;
  }

  // ------------------------------ Management Order ------------------------------ //

  // --------------- Update Order --------------- //
  async updateOrder(id: number, dto: UpdateOrderDto): Promise<OrderResponse> {
    const order = await this.orderRepository.findByID(id);
    if (!order) throw new BadRequestException('Такой заявки не существует');

    if (convertStringToTime(dto.timeStart) >= convertStringToTime(dto.timeEnd))
      throw new BadRequestException('Некорректно указан промежуток времени');

    const room = await this.roomService.getById(order.roomId);
    if (!room) throw new BadRequestException('Такой комнаты несуществует');

    const existOrdersTime = await this.orderRepository.findExistingOrdersTime(
      order.roomId,
    );
    checkingFreeTime(
      new Date(dto.timeStart),
      new Date(dto.timeEnd),
      room,
      existOrdersTime,
    );

    return await this.orderRepository.update({
      id,
      timeStart: new Date(dto.timeStart),
      timeEnd: new Date(dto.timeEnd),
    });
  }

  // --------------- Delete Order --------------- //
  async deleteOrder(id: number): Promise<boolean> {
    const order = await this.orderRepository.findByID(id);
    if (!order) return true;
    await this.orderRepository.delete(id);
    return true;
  }

  // --------------- Update order status --------------- //
  //async updateOrderStatus(id: number, status: UpdateOrderStatusDto) {
  //  const order = await this.orderRepository.findByID(id);
  //  if (!order) throw new BadRequestException('Такой заявки не существует');
  //  await this.prismaService.order.update({
  //    where: { id },
  //    data: {
  //      status: status.status,
  //    },
  //  });
  //  return status;
  //}

  @Cron(CronExpression.EVERY_12_HOURS)
  async deleteOverdueOrders() {
    await this.orderRepository.deleteOverdueOrders();
  }
}
