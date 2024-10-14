import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  roomId: number;

  @IsString()
  timeStart: string;

  @IsNumber()
  duration: number;

  @IsString()
  summaryEvent: string;

  @IsString()
  fio: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;
}
