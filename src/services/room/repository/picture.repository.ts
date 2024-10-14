import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ICreatePicture,
  IGetPicturesName,
  IPicture,
} from '../interface/pictureInterface';

@Injectable()
export class PictureRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createMany(data: ICreatePicture[]): Promise<IPicture[]> {
    return this.prismaService.picture.createManyAndReturn({
      data: data,
    });
  }

  async findManyByRoomID(roomId: number): Promise<IGetPicturesName[]> {
    return this.prismaService.picture.findMany({
      where: { roomId: roomId },
      select: {
        name: true,
      },
    });
  }

  async getByName(name: string): Promise<IPicture> {
    return this.prismaService.picture.findUnique({ where: { name } });
  }

  async delete(name: string): Promise<void> {
    await this.prismaService.$transaction(async (prisma) => {
      await prisma.picture.delete({ where: { name } });
    });
  }
}
