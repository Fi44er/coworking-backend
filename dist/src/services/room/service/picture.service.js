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
exports.PictureService = void 0;
const common_1 = require("@nestjs/common");
const picture_repository_1 = require("../repository/picture.repository");
const room_repository_1 = require("../repository/room.repository");
const path_1 = require("path");
const sharp = require("sharp");
const uuid_1 = require("uuid");
const promises_1 = require("fs/promises");
const constants_1 = require("../constant/constants");
let PictureService = class PictureService {
    constructor(pictureRepository, roomRepository) {
        this.pictureRepository = pictureRepository;
        this.roomRepository = roomRepository;
    }
    async upload(roomId, files) {
        const room = await this.roomRepository.findByID(roomId);
        if (!room)
            throw new Error('Такого помещения не существует');
        const exportPictures = await this.pictureRepository.findManyByRoomID(roomId);
        if (exportPictures.length >= 5) {
            throw new Error('Максимальное количество изображений - 5');
        }
        const uploadFolder = (0, path_1.join)(__dirname, constants_1.UPLOAD_PATH);
        try {
            await (0, promises_1.access)(uploadFolder);
        }
        catch (e) {
            await (0, promises_1.mkdir)(uploadFolder, { recursive: true });
        }
        if (!files || files.length === 0) {
            return [];
        }
        const createPictureData = [];
        await Promise.all(files.map(async (file) => {
            if (!file.originalname.match(constants_1.VALID_IMAGE_EXTENSIONS)) {
                return;
            }
            const newname = `${(0, uuid_1.v4)()}.webp`;
            try {
                await sharp(file.buffer)
                    .toFormat('webp')
                    .resize({ width: 650 })
                    .webp({ quality: 50 })
                    .toFile((0, path_1.join)(uploadFolder, newname));
                createPictureData.push({ roomId: roomId, name: newname });
            }
            catch (error) {
                console.log(error);
                throw new common_1.InternalServerErrorException('Ошибка при обработке фото');
            }
        }));
        if (createPictureData.length === 0) {
            throw new common_1.BadRequestException('Неверное расширение изображения');
        }
        return await this.pictureRepository.createMany(createPictureData);
    }
    async getByRoomID(roomId) {
        return await this.pictureRepository.findManyByRoomID(roomId);
    }
    async delete(name) {
        try {
            const picture = await this.pictureRepository.getByName(name);
            if (!picture)
                throw new common_1.BadRequestException('Такого файла не существует');
            await this.pictureRepository.delete(name);
            const filePath = (0, path_1.join)(__dirname, constants_1.UPLOAD_PATH + name);
            await (0, promises_1.rm)(filePath);
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
};
exports.PictureService = PictureService;
exports.PictureService = PictureService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [picture_repository_1.PictureRepository,
        room_repository_1.RoomRepository])
], PictureService);
//# sourceMappingURL=picture.service.js.map