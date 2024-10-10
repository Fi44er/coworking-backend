import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePictureDto {
  @ApiProperty()
  roomId: number;

  @ApiProperty()
  @IsString()
  name: string;
}
