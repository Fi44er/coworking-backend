import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomResponse {
  id: number;
  @ApiProperty()
  address: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  places: number;

  @ApiProperty()
  weekDays: string[];

  @ApiProperty()
  timeStart: Date;

  @ApiProperty()
  timeEnd: Date;
}
