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
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const room_repository_1 = require("../repository/room.repository");
const constants_1 = require("../constant/constants");
let RoomService = class RoomService {
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }
    async create(dto) {
        const uniqElements = new Set(dto.weekDays);
        uniqElements.forEach((element) => {
            if (!constants_1.VALID_WEEK_DAYS_REGEX.test(element)) {
                throw new common_1.BadRequestException('Некорректно указаны дни недели. Корректные дни: Пн, Вт, Ср, Чт, Пт, Сб, Вс');
            }
        });
        return await this.roomRepository.create(dto);
    }
    async getAll() {
        return await this.roomRepository.findMany();
    }
    async getById(id) {
        return await this.roomRepository.findByID(id);
    }
    async update(id, dto) {
        const existRoom = await this.roomRepository.findByID(id);
        if (!existRoom)
            throw new common_1.BadRequestException('Такой комнаты не существует');
        return await this.roomRepository.update(id, dto);
    }
    async delete(id) {
        await this.roomRepository.delete(id);
        return true;
    }
};
exports.RoomService = RoomService;
exports.RoomService = RoomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [room_repository_1.RoomRepository])
], RoomService);
//# sourceMappingURL=room.service.js.map