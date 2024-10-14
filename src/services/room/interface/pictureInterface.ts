export interface ICreatePicture {
  roomId: number;
  name: string;
}

export interface IPicture {
  id: number;
  roomId: number;
  name: string;
}

export interface IGetPicturesName {
  name: string;
}
