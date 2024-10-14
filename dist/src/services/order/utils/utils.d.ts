import { IExistingOrdersTime } from '../interface/order.interface';
export declare function sortingOrdersByTime<T extends {
    timeStart: Date;
}>(time: 'INCREASING' | 'DECREASING', orders: T[]): void;
export declare function checkingFreeTime<T extends {
    timeStart: Date;
    timeEnd: Date;
    weekDays: string[];
}>(timeStart: Date, timeEnd: Date, room: T, existOrdersTime: IExistingOrdersTime[]): void;
