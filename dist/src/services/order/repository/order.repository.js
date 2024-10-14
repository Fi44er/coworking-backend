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
exports.OrderRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let OrderRepository = class OrderRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(order) {
        return this.prismaService.order.create({ data: order });
    }
    async findAll() {
        return this.prismaService.order.findMany();
    }
    async findByRoomID(id) {
        return this.prismaService.order.findMany({ where: { roomId: id } });
    }
    async findByID(id) {
        return this.prismaService.order.findUnique({ where: { id } });
    }
    async findExistingOrdersTime(roomId, id) {
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
    async update(data) {
        return this.prismaService.order.update({ where: { id: data.id }, data });
    }
    async delete(id) {
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
};
exports.OrderRepository = OrderRepository;
exports.OrderRepository = OrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderRepository);
//# sourceMappingURL=order.repository.js.map