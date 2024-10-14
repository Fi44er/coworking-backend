import { IsNumber, IsString } from 'class-validator';

export class UpdateRoomDto {
  @IsString()
  address?: string;

  @IsString()
  name?: string;

  @IsString()
  description?: string;

  @IsNumber()
  places?: number;

  weekDays?: string[];

  timeStart?: string;

  timeEnd?: string;
}
