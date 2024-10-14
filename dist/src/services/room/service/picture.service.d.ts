import { PictureRepository } from '../repository/picture.repository';
import { RoomRepository } from '../repository/room.repository';
import { GetPicturesNameResponse } from '../response/picture.response';
export declare class PictureService {
    private readonly pictureRepository;
    private readonly roomRepository;
    constructor(pictureRepository: PictureRepository, roomRepository: RoomRepository);
    upload(roomId: number, files: Express.Multer.File[]): Promise<GetPicturesNameResponse[]>;
    getByRoomID(roomId: number): Promise<GetPicturesNameResponse[]>;
    delete(name: string): Promise<boolean>;
}
