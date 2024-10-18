export interface IRoomBase {
  address: string;
  name: string;
  description: string;
  places: number;
  weekDays: string[];
}

export interface ICreateRoom extends IRoomBase {
  timeStart: string;
  timeEnd: string;
}
export interface IUpdateRoom extends Partial<IRoomBase> {
  timeStart?: string;
  timeEnd?: string;
}
export interface IRoom extends IRoomBase {
  id: number;
  timeStart: Date;
  timeEnd: Date;
}

export interface IRoomResponse extends IRoomBase {
  id: number;
  timeStart: Date;
  timeEnd: Date;
  picture: { name: string }[];
}
