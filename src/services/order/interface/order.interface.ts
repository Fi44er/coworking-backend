export interface IOrder {
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

export interface IExistingOrdersTime {
  timeStart: Date;
  timeEnd: Date;
}

export interface ICreateOrder {
  roomId: number;
  timeStart: Date;
  timeEnd: Date;
  summaryEvent: string;
  fio: string;
  email: string;
  phoneNumber: string;
}

export interface IUpdateOrder extends IExistingOrdersTime {
  id: number;
}
