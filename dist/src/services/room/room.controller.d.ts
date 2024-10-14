import { CreateRoomResponse, RoomResponse } from './response/room.response';
import { RoomService } from './service/room.service';
import { GetPicturesNameResponse } from './response/picture.response';
import { PictureService } from './service/picture.service';
import { CreateRoomDto } from './dto';
export declare class RoomController {
    private readonly roomService;
    private readonly pictureService;
    constructor(roomService: RoomService, pictureService: PictureService);
    addRoom(dto: CreateRoomDto): Promise<CreateRoomResponse>;
    getAllRooms(): Promise<RoomResponse[]>;
    getRoom(roomId: string): Promise<RoomResponse>;
    updateRoom(id: number, dto: Partial<CreateRoomDto>): Promise<CreateRoomResponse>;
    deleteRoom(roomId: string): Promise<boolean>;
    uploadPicture(roomId: string, files: Express.Multer.File[]): Promise<GetPicturesNameResponse[]>;
    getNamesPictureByRoomId(roomId: string): Promise<GetPicturesNameResponse[]>;
    deletePicture(pictureName: string): Promise<boolean>;
}
