import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  places: number;

  @ApiProperty()
  @IsNotEmpty()
  weekDays: string[];

  @ApiProperty()
  @IsNotEmpty()
  timeStart: string;

  @ApiProperty()
  @IsNotEmpty()
  timeEnd: string;
}
