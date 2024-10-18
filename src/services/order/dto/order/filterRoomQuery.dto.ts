enum filter {
  increasing = 'INCREASING',
  decreasing = 'DECREASING',
}

export class FilterOrdersQueryDto {
  roomId?: number;
  time?: filter;
}
