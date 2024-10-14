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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../../../lib/decorators/public.decorator");
const room_response_1 = require("./response/room.response");
const room_service_1 = require("./service/room.service");
const picture_response_1 = require("./response/picture.response");
const picture_service_1 = require("./service/picture.service");
const dto_1 = require("./dto");
let RoomController = class RoomController {
    constructor(roomService, pictureService) {
        this.roomService = roomService;
        this.pictureService = pictureService;
    }
    async addRoom(dto) {
        return this.roomService.create(dto);
    }
    async getAllRooms() {
        return this.roomService.getAll();
    }
    async getRoom(roomId) {
        return this.roomService.getById(+roomId);
    }
    async updateRoom(id, dto) {
        if (!id)
            throw new common_1.BadRequestException('Room ID not provided');
        return this.roomService.update(+id, dto);
    }
    async deleteRoom(roomId) {
        return this.roomService.delete(+roomId);
    }
    async uploadPicture(roomId, files) {
        return this.pictureService.upload(+roomId, files);
    }
    async getNamesPictureByRoomId(roomId) {
        return this.pictureService.getByRoomID(+roomId);
    }
    async deletePicture(pictureName) {
        return this.pictureService.delete(pictureName);
    }
};
exports.RoomController = RoomController;
__decorate([
    (0, common_1.Post)('add-room'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a new room' }),
    (0, swagger_1.ApiBody)({ type: dto_1.CreateRoomDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Room successfully created',
        type: room_response_1.CreateRoomResponse,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateRoomDto]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "addRoom", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('get-all-rooms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getAllRooms", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('get-room/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get room by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Room ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Room found', type: room_response_1.RoomResponse }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getRoom", null);
__decorate([
    (0, common_1.Put)('update-room/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update room by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Room ID' }),
    (0, swagger_1.ApiBody)({ type: dto_1.CreateRoomDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Room successfully updated',
        type: room_response_1.CreateRoomResponse,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad request' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "updateRoom", null);
__decorate([
    (0, common_1.Delete)('delete-room/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete room by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Room ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Room successfully deleted' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "deleteRoom", null);
__decorate([
    (0, common_1.Post)('upload-picture/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload picture by room id' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Room ID' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('image')),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pictures successfully uploaded',
        type: [picture_response_1.GetPicturesNameResponse],
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "uploadPicture", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('get-names-picture-by-room-id/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get names of pictures by room id' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Room ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pictures names retrieved',
        type: [picture_response_1.GetPicturesNameResponse],
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getNamesPictureByRoomId", null);
__decorate([
    (0, common_1.Delete)('delete-picture/:name'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete picture by name' }),
    (0, swagger_1.ApiParam)({ name: 'name', description: 'Picture name' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Picture deleted', type: Boolean }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "deletePicture", null);
exports.RoomController = RoomController = __decorate([
    (0, swagger_1.ApiTags)('rooms'),
    (0, common_1.Controller)('room'),
    __metadata("design:paramtypes", [room_service_1.RoomService,
        picture_service_1.PictureService])
], RoomController);
//# sourceMappingURL=room.controller.js.map