import { Injectable } from '@nestjs/common';
import { Picture } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetPicturesNameResponse } from '../Response/GetPicturesName.response';
import { CreatePictureDto } from '../DTO/createPicture';

@Injectable()
export class PictureRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createMany(data: CreatePictureDto[]): Promise<Picture[]> {
    return this.prismaService.picture.createManyAndReturn({
      data: data,
    });
  }

  async findManyByRoomID(roomId: number): Promise<GetPicturesNameResponse[]> {
    return this.prismaService.picture.findMany({
      where: { roomId: roomId },
      select: {
        name: true,
      },
    });
  }

  async getByName(name: string): Promise<Picture> {
    return this.prismaService.picture.findUnique({ where: { name } });
  }

  async delete(name: string): Promise<void> {
    await this.prismaService.$transaction(async (prisma) => {
      await prisma.picture.delete({ where: { name } });
    });
  }
}
