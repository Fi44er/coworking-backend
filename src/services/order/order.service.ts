import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { countingTimeEnd } from 'lib/utils/convert-to-time.util';
import { CreateOrderDto } from './DTO/CreateOrder.dto';
import { OrderResponse } from './Response/Order.response';
import { UpdateOrderDto } from './DTO/UpdateOrder.dto';
import { convertStringToTime } from 'lib/utils/convertStringToDate.util';
import { OrderStatus } from '@prisma/client';
import { EmailService } from '../mailer/mailer.service';



const daysOfWeek: { [key: string]: string } = {
    1: "Пн",
    2: "Вт",
    3: "Ср",
    4: "Чт",
    5: "Пт",
    6: "Сб",
    7: "Вс"
};

@Injectable()
export class OrderService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly emailService: EmailService
    ) {}

    // ------------------------------ Order ------------------------------ //

    // --------------- Create Order --------------- //
    async createOrder(dto: CreateOrderDto): Promise<OrderResponse> {
        const room = await this.prismaService.room.findUnique({where: {id: dto.roomId}})
        if(!room) throw new BadRequestException('Такой комнаты несуществует')
        const timeEnd = countingTimeEnd(dto.timeStart, dto.duration)

        await this.checkingFreeTime(new Date(dto.timeStart), timeEnd, dto.roomId)

        const payment = +dto.duration * room.price
        const order = await this.prismaService.order.create({
            data: {
                roomId: dto.roomId,
                timeStart: new Date(dto.timeStart),
                timeEnd,
                summaryEvent: dto.summaryEvent,
                fio: dto.fio,
                email: dto.email,
                phoneNumber: dto.phoneNumber,
                payment
            }
        })

        await this.emailService.sendEmail(order)

        return order
    }

    // --------------- Get All Order --------------- //
    async getAllOrders(): Promise<OrderResponse[]> {
        const orders = await this.prismaService.order.findMany()
        return orders
    }

    // --------------- Get Order by id --------------- //
    async getOrderById(id: number): Promise<OrderResponse> {
        const order = await this.prismaService.order.findUnique({where: {id}})
        if(!order) throw new BadRequestException('Такой заявки не существует')
        return order
    }

    // --------------- checking for a record for a period of time --------------- //
    private async checkingFreeTime(timeStart: Date, timeEnd: Date, roomId: number): Promise<boolean> {
        const room = await this.prismaService.room.findUnique({where: {id: roomId}})
        const dateNow = new Date(Date.now())
        const roomTimeStart = new Date(timeStart.getFullYear(), timeStart.getMonth(), timeStart.getDate(), room.timeStart.getHours() - 5, room.timeStart.getMinutes())
        const roomTimeEnd = new Date(timeStart.getFullYear(), timeStart.getMonth(), timeStart.getDate() + 1, room.timeEnd.getHours() - 5, room.timeEnd.getMinutes())

        const bookingDay = daysOfWeek[timeStart.getDay()]
        
        const dayStatus = room.weekDays.includes(bookingDay)
        if(!dayStatus) throw new BadRequestException('На этот день нельзя забронировать помещение')

        const existingTime = timeStart >= roomTimeStart && timeEnd <= roomTimeEnd
        
        if(!existingTime) throw new BadRequestException('На это время нельзя забронировать помещение')

        const existOrders = await this.prismaService.order.findMany({
            where: {roomId: roomId},
            select: {
                timeStart: true,
                timeEnd: true
            }
        })
        
        let existingStatus = false
        existOrders.forEach(order => {
            const existingTime = timeStart < order.timeEnd && timeEnd > order.timeStart
            if(existingTime) {
                existingStatus = existingTime
                return existingStatus
            }
        });

        if(existingStatus) throw new BadRequestException('Данное время уже занято')
        return true
    }


    // ------------------------------ Management Order ------------------------------ //

    // --------------- Update Order --------------- //
    async updateOrder(id: number, dto: UpdateOrderDto): Promise<OrderResponse> {
        const order = await this.prismaService.order.findUnique({where: {id}})
        if(!order) throw new BadRequestException('Такой заявки не существует')

        if(convertStringToTime(dto.timeStart) >= convertStringToTime(dto.timeEnd)) throw new BadRequestException('Некорректно указан промежуток времени')
        const existingOrder = await this.checkingFreeTime(new Date(dto.timeStart), new Date(dto.timeEnd), order.roomId)
        if(existingOrder) throw new BadRequestException('Данное время уже занято')
        return await this.prismaService.order.update({
            where: {id},
            data: {
                timeStart: new Date(dto.timeStart),
                timeEnd: new Date(dto.timeEnd)
            }
        })
    }

    // --------------- Delete Order --------------- //
    async deleteOrder(id: number): Promise<boolean> {
        const order = await this.prismaService.order.findUnique({where: {id}})
        if(!order) return true
        await this.prismaService.order.delete({where: {id}})
        return true
    }

     // --------------- Update order status --------------- //
     async updateOrderStatus(id: number, status: OrderStatus) {
        const order = await this.prismaService.order.findFirst({where: {id}})
        if(!order) throw new BadRequestException('Такой заявки не существует')
        this.prismaService.order.update({
            where: {id},
            data: {
                status: status
            }
        })

        return status
    }
}
