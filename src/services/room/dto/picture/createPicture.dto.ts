import { IsString } from 'class-validator';

export class CreatePictureDto {
  roomId: number;

  @IsString()
  name: string;
}
