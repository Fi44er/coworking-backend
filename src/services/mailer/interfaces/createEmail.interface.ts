export interface ICreateEmail {
  id: number;
  roomId: number;
  timeStart: Date;
  timeEnd: Date;
  summaryEvent: string;
  fio: string;
  phoneNumber: string;
  status: string;
  email: string;
}
