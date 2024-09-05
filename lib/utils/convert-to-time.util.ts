import { convertStringToTime } from './convertStringToDate.util';

export const countingTimeEnd = (timeStartStr: string, duration: number) => {
  const dateTime = convertStringToTime(timeStartStr);
  const startHour = dateTime.getHours();
  const hour = startHour + duration;
  return new Date(
    dateTime.getFullYear(),
    dateTime.getMonth(),
    dateTime.getDate(),
    hour,
    dateTime.getMinutes(),
  );
};
