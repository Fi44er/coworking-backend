import { BadRequestException } from '@nestjs/common';
import { IExistingOrdersTime } from '../interface/order.interface';

export function sortingOrdersByTime<T extends { timeStart: Date }>(
  time: 'INCREASING' | 'DECREASING',
  orders: T[],
): void {
  switch (time) {
    case 'INCREASING':
      orders.sort((a, b) => a.timeStart.getTime() - b.timeStart.getTime());
      break;
    case 'DECREASING':
      orders.sort((a, b) => b.timeStart.getTime() - a.timeStart.getTime());
      break;
  }
}

export function checkingFreeTime<
  T extends { timeStart: Date; timeEnd: Date; weekDays: string[] },
>(
  timeStart: Date,
  timeEnd: Date,
  room: T,
  existOrdersTime: IExistingOrdersTime[],
): void {
  const roomTimeStart = new Date(
    timeStart.getFullYear(),
    timeStart.getMonth(),
    timeStart.getDate(),
    room.timeStart.getHours() - 5,
    room.timeStart.getMinutes(),
  );
  const roomTimeEnd = new Date(
    timeStart.getFullYear(),
    timeStart.getMonth(),
    timeStart.getDate() + 1,
    room.timeEnd.getHours() - 5,
    room.timeEnd.getMinutes(),
  );

  const bookingDay = DAYS_OF_WEEK[timeStart.getDay()];

  const dayStatus = room.weekDays.includes(bookingDay);
  if (!dayStatus)
    throw new BadRequestException(
      'На этот день нельзя забронировать помещение',
    );

  const existingTime = timeStart >= roomTimeStart && timeEnd <= roomTimeEnd;

  if (!existingTime)
    throw new BadRequestException(
      'На это время нельзя забронировать помещение',
    );

  let existingStatus = false;
  existOrdersTime.forEach((order) => {
    const existingTime = timeStart < order.timeEnd && timeEnd > order.timeStart;
    if (existingTime) {
      existingStatus = existingTime;
      return existingStatus;
    }
  });

  if (existingStatus) throw new BadRequestException('Данное время уже занято');
}
