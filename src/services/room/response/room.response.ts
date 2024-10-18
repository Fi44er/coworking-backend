export class CreateRoomResponse {
  id: number;
  address: string;

  name: string;

  description: string;

  places: number;

  weekDays: string[];

  timeStart: Date;

  timeEnd: Date;
}

export class RoomResponse {
  id: number;
  address: string;

  name: string;

  description: string;

  places: number;

  weekDays: string[];

  timeStart: Date;

  timeEnd: Date;
  picture: { name: string }[];
}
