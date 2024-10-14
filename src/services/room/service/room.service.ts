import { BadRequestException, Injectable } from '@nestjs/common';
import { RoomRepository } from '../repository/room.repository';
import { CreateRoomResponse, RoomResponse } from '../response/room.response';
import { CreateRoomDto, UpdateRoomDto } from '../dto';
import { VALID_WEEK_DAYS_REGEX } from '../constant/constants';

@Injectable()
export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  async create(dto: CreateRoomDto): Promise<CreateRoomResponse> {
    const uniqElements = new Set(dto.weekDays);
    uniqElements.forEach((element) => {
      if (!VALID_WEEK_DAYS_REGEX.test(element)) {
        throw new BadRequestException(
          'Некорректно указаны дни недели. Корректные дни: Пн, Вт, Ср, Чт, Пт, Сб, Вс',
        );
      }
    });
    return await this.roomRepository.create(dto);
  }

  async getAll(): Promise<RoomResponse[]> {
    return await this.roomRepository.findMany();
  }

  async getById(id: number): Promise<RoomResponse> {
    return await this.roomRepository.findByID(id);
  }

  async update(id: number, dto: UpdateRoomDto): Promise<CreateRoomResponse> {
    const existRoom = await this.roomRepository.findByID(id);
    if (!existRoom)
      throw new BadRequestException('Такой комнаты не существует');
    return await this.roomRepository.update(id, dto);
  }

  async delete(id: number): Promise<boolean> {
    await this.roomRepository.delete(id);
    return true;
  }
}
