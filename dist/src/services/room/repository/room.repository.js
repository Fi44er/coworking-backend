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
exports.RoomRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let RoomRepository = class RoomRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(data) {
        const { timeStart, timeEnd, ...rest } = data;
        return this.prismaService.room.create({
            data: {
                ...rest,
                timeStart: new Date('1970-01-01T' + timeStart + 'Z'),
                timeEnd: new Date('1970-01-01T' + timeEnd + 'Z'),
            },
        });
    }
    async findMany() {
        return this.prismaService.room.findMany({
            include: {
                picture: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }
    async findByID(id) {
        return this.prismaService.room.findUnique({
            where: { id },
            include: {
                picture: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }
    async update(id, dto) {
        const { timeStart, timeEnd, ...rest } = dto;
        return this.prismaService.room.update({
            where: { id },
            data: {
                ...rest,
                timeStart: timeStart && new Date('1970-01-01T' + timeStart + 'Z'),
                timeEnd: timeEnd && new Date('1970-01-01T' + timeEnd + 'Z'),
            },
        });
    }
    async delete(id) {
        return this.prismaService.room.delete({ where: { id } });
    }
};
exports.RoomRepository = RoomRepository;
exports.RoomRepository = RoomRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoomRepository);
//# sourceMappingURL=room.repository.js.map