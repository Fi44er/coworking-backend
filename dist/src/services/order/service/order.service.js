"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const convert_to_time_util_1 = require("../../../../lib/utils/convert-to-time.util");
const convertStringToDate_util_1 = require("../../../../lib/utils/convertStringToDate.util");
const schedule_1 = require("@nestjs/schedule");
const mailer_service_1 = require("../../mailer/mailer.service");
const order_repository_1 = require("../repository/order.repository");
const room_service_1 = require("../../room/service/room.service");
const utils_1 = require("../utils/utils");
let OrderService = class OrderService {
    constructor(emailService, orderRepository, roomService) {
        this.emailService = emailService;
        this.orderRepository = orderRepository;
        this.roomService = roomService;
    }
    async createOrder(dto) {
        const room = await this.roomService.getById(dto.roomId);
        if (!room)
            throw new common_1.BadRequestException('Такой комнаты несуществует');
        const timeEnd = (0, convert_to_time_util_1.countingTimeEnd)(dto.timeStart, dto.duration);
        const existOrdersTime = await this.orderRepository.findExistingOrdersTime(dto.roomId);
        (0, utils_1.checkingFreeTime)(new Date(dto.timeStart), timeEnd, room, existOrdersTime);
        const { timeStart, ...rest } = dto;
        const data = {
            ...rest,
            timeStart: new Date(timeStart),
            timeEnd,
        };
        const order = await this.orderRepository.create(data);
        await this.emailService.sendEmail(order);
        return order;
    }
    async getAllOrders(query) {
        const { roomId, time } = query;
        let orders = [];
        if (roomId) {
            orders = await this.orderRepository.findByRoomID(roomId);
        }
        else {
            orders = await this.orderRepository.findAll();
        }
        (0, utils_1.sortingOrdersByTime)(time, orders);
        return orders;
    }
    async getOrderById(id) {
        const order = await this.orderRepository.findByID(id);
        if (!order)
            throw new common_1.BadRequestException('Такой заявки не существует');
        return order;
    }
    async updateOrder(id, dto) {
        const order = await this.orderRepository.findByID(id);
        if (!order)
            throw new common_1.BadRequestException('Такой заявки не существует');
        if ((0, convertStringToDate_util_1.convertStringToTime)(dto.timeStart) >= (0, convertStringToDate_util_1.convertStringToTime)(dto.timeEnd))
            throw new common_1.BadRequestException('Некорректно указан промежуток времени');
        const room = await this.roomService.getById(order.roomId);
        if (!room)
            throw new common_1.BadRequestException('Такой комнаты несуществует');
        const existOrdersTime = await this.orderRepository.findExistingOrdersTime(order.roomId);
        (0, utils_1.checkingFreeTime)(new Date(dto.timeStart), new Date(dto.timeEnd), room, existOrdersTime);
        return await this.orderRepository.update({
            id,
            timeStart: new Date(dto.timeStart),
            timeEnd: new Date(dto.timeEnd),
        });
    }
    async deleteOrder(id) {
        const order = await this.orderRepository.findByID(id);
        if (!order)
            return true;
        await this.orderRepository.delete(id);
        return true;
    }
    async deleteOverdueOrders() {
        await this.orderRepository.deleteOverdueOrders();
    }
};
exports.OrderService = OrderService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_12_HOURS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderService.prototype, "deleteOverdueOrders", null);
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_service_1.EmailService,
        order_repository_1.OrderRepository,
        room_service_1.RoomService])
], OrderService);
//# sourceMappingURL=order.service.js.map