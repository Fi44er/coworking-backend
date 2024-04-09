// photo.service.ts
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { existsSync, writeFile } from 'fs';
import { access, mkdir, rm } from 'fs/promises';
import { join } from 'path';
import { v4 } from 'uuid'
import { CreateRoomDto } from './DTO/CreateRoom.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetPicturesNameResponse } from './Response/GetPicturesName.response';
import { RoomResponse } from './Response/Room.response.dto';
import { CreateRoomResponse } from './Response/CreateRoom.response';


const UPLOAD_PATH = '../../../../uploads/'
@Injectable()
export class RoomService {
  constructor(private readonly prismaService: PrismaService) {}

  // ------------------------------ Room ------------------------------ //

  // --------------- Add or Update Room --------------- //
  async addRoom(dto: CreateRoomDto): Promise<CreateRoomResponse> {
    const room = await this.prismaService.room.create({
      data: {
        address: dto.address,
        name: dto.name,
        description: dto.description,
        price: dto.price,
        places: dto.places,
        weekDays: dto.weekDays,
        timeStart: new Date("1970-01-01T" + dto.timeStart + "Z"),
        timeEnd: new Date("1970-01-01T" + dto.timeEnd + "Z")
      }
    })
    return room
  }

  // --------------- Get All Rooms --------------- //
  async getAllRooms(): Promise<RoomResponse[]> {
    const rooms = await this.prismaService.room.findMany({
      include: {
        picture: {
          select: {
            name: true
          }
        }
      }
    })
    return rooms
  }

  // --------------- Update Room --------------- //
  async updateRoom(id: number, dto: Partial<CreateRoomDto>): Promise<CreateRoomResponse> {
    const existRoom = await this.prismaService.room.findUnique({where: {id}})
    if(!existRoom) throw new BadRequestException('Такой комнаты не существует')
    const room = await this.prismaService.room.update({
      where: {id: id},
      data: {
        address: dto?.address,
        name: dto?.name,
        description: dto?.description,
        price: dto?.price,
        places: dto?.places,
        weekDays: dto?.weekDays,
        timeStart: dto?.timeStart,
        timeEnd: dto?.timeEnd
      }
    })
    return room
  }

  // --------------- Get Room by id --------------- //
  async getRoom(roomId: number): Promise<RoomResponse> {
    return await this.prismaService.room.findFirst({
      where: {id: roomId},
      include: {
        picture: {
          select: {
            name: true
          }
        }
      }
    })
  }

  // --------------- Delete Room by id --------------- //
  async deleteRoom(roomId: number): Promise<boolean> {
    const room = await this.prismaService.room.findUnique({where: {id: roomId}})
    if(!room) throw new BadRequestException('Такого помещения не существует')
    await this.prismaService.room.delete({where: {id: roomId}})
    return true
  }


  // ------------------------------ Picture ------------------------------ //

  // --------------- Upload Image --------------- //
  async uploadPicture(roomId: number, files: Express.Multer.File[]): Promise<GetPicturesNameResponse[]> {
    const uploadFolder = join(__dirname, UPLOAD_PATH)

    const room = await this.prismaService.room.findUnique({where: {id: roomId}})
    if(!room) throw new BadRequestException('Такого помещения не существует')

    try {
      await access(uploadFolder)
    } catch(e) {
      await mkdir(uploadFolder, { recursive: true })  
    }

    if (!files || files.length === 0) {
      return [];
    }

    let picturesName = []
    await Promise.all(
      files.map(async (file) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
          return
        }
        const newname = `${v4()}.${file.originalname.split('.')[1]}`
        await writeFile(join(uploadFolder, newname), file.buffer, (error) => {
          if(error) throw new InternalServerErrorException('Ошибка при записи фото')
        })
        picturesName.push({roomId: roomId, name: newname})
      })
    )
    if(picturesName.length === 0) {
      throw new BadRequestException('Загружаемый файл должен быть определенного типа(jpg, jpeg, png, webp))')
    }else {
      await this.prismaService.picture.createMany({data: picturesName})
      return picturesName
    }
  }  

  // --------------- Get Names room by id --------------- //
  async getPicturesByRoomId(roomId: number): Promise<GetPicturesNameResponse[]> {
    return await this.prismaService.picture.findMany({
      where: {roomId: roomId},
      select: {
        name: true
      }
    })
  }

  // --------------- Delete Picture by id --------------- //
  async deletePicture(pictureName: string): Promise<boolean> {
    const existFile = existsSync(UPLOAD_PATH + pictureName)
    if(!existFile) throw new BadRequestException('Такого файла не существует')
    const puthToFile = join(__dirname, UPLOAD_PATH + pictureName)
    await rm(puthToFile)
    await this.prismaService.picture.delete({where: {name: pictureName}})
    return true
  }
}