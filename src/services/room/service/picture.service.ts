import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PictureRepository } from '../repository/picture.repository';
import { RoomRepository } from '../repository/room.repository';
import { join } from 'path';
import * as sharp from 'sharp';
import { v4 } from 'uuid';
import { access, mkdir, rm } from 'fs/promises';
import { GetPicturesNameResponse } from '../response/picture.response';
import { CreatePictureDto } from '../dto';
import { UPLOAD_PATH, VALID_IMAGE_EXTENSIONS } from '../constant/constants';

@Injectable()
export class PictureService {
  constructor(
    private readonly pictureRepository: PictureRepository,
    private readonly roomRepository: RoomRepository,
  ) {}

  async upload(
    roomId: number,
    files: Express.Multer.File[],
  ): Promise<GetPicturesNameResponse[]> {
    const room = await this.roomRepository.findByID(roomId);
    if (!room) throw new Error('Такого помещения не существует');

    const exportPictures =
      await this.pictureRepository.findManyByRoomID(roomId);
    if (exportPictures.length >= 5) {
      throw new Error('Максимальное количество изображений - 5');
    }

    const uploadFolder = join(__dirname, UPLOAD_PATH);

    try {
      await access(uploadFolder);
    } catch (e) {
      await mkdir(uploadFolder, { recursive: true });
    }

    if (!files || files.length === 0) {
      return [];
    }

    const createPictureData: CreatePictureDto[] = [];

    await Promise.all(
      files.map(async (file) => {
        if (!file.originalname.match(VALID_IMAGE_EXTENSIONS)) {
          return;
        }
        const newname = `${v4()}.webp`;

        try {
          await sharp(file.buffer)
            .toFormat('webp')
            .resize({ width: 650 })
            .webp({ quality: 50 })
            .toFile(join(uploadFolder, newname));

          createPictureData.push({ roomId: roomId, name: newname });
        } catch (error) {
          console.log(error);
          throw new InternalServerErrorException('Ошибка при обработке фото');
        }
      }),
    );

    if (createPictureData.length === 0) {
      throw new BadRequestException('Неверное расширение изображения');
    }
    return await this.pictureRepository.createMany(createPictureData);
  }

  async getByRoomID(roomId: number): Promise<GetPicturesNameResponse[]> {
    return await this.pictureRepository.findManyByRoomID(roomId);
  }

  async delete(name: string): Promise<boolean> {
    try {
      const picture = await this.pictureRepository.getByName(name);

      if (!picture) throw new BadRequestException('Такого файла не существует');

      await this.pictureRepository.delete(name);

      const filePath = join(__dirname, UPLOAD_PATH + name);
      await rm(filePath);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
