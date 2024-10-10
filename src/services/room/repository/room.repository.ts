import { Injectable } from '@nestjs/common';
import { Room } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateRoomDto } from '../DTO/updateRoom.dto';
import { CreateRoomDto } from '../DTO/createRoom.dto';

@Injectable()
export class RoomRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateRoomDto): Promise<Room> {
    const { timeStart, timeEnd, ...rest } = data;
    return this.prismaService.room.create({
      data: {
        ...rest,
        timeStart: new Date('1970-01-01T' + timeStart + 'Z'),
        timeEnd: new Date('1970-01-01T' + timeEnd + 'Z'),
      },
    });
  }

  async findMany(): Promise<Room[]> {
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

  async findByID(id: number): Promise<Room> {
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

  async update(id: number, dto: UpdateRoomDto): Promise<Room> {
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

  async delete(id: number): Promise<Room> {
    return this.prismaService.room.delete({ where: { id } });
  }
}
