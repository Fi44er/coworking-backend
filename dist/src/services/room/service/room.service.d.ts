import { RoomRepository } from '../repository/room.repository';
import { CreateRoomResponse, RoomResponse } from '../response/room.response';
import { CreateRoomDto, UpdateRoomDto } from '../dto';
export declare class RoomService {
    private readonly roomRepository;
    constructor(roomRepository: RoomRepository);
    create(dto: CreateRoomDto): Promise<CreateRoomResponse>;
    getAll(): Promise<RoomResponse[]>;
    getById(id: number): Promise<RoomResponse>;
    update(id: number, dto: UpdateRoomDto): Promise<CreateRoomResponse>;
    delete(id: number): Promise<boolean>;
}
