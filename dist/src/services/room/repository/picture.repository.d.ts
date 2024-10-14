import { PrismaService } from 'src/prisma/prisma.service';
import { ICreatePicture, IGetPicturesName, IPicture } from '../interface/pictureInterface';
export declare class PictureRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createMany(data: ICreatePicture[]): Promise<IPicture[]>;
    findManyByRoomID(roomId: number): Promise<IGetPicturesName[]>;
    getByName(name: string): Promise<IPicture>;
    delete(name: string): Promise<void>;
}
