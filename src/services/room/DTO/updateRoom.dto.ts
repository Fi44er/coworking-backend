import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateRoomDto {
  @ApiProperty()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNumber()
  places?: number;

  @ApiProperty()
  weekDays?: string[];

  @ApiProperty()
  timeStart?: string;

  @ApiProperty()
  timeEnd?: string;
}
