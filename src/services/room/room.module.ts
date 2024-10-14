import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RoomService } from './service/room.service';
import { PictureService } from './service/picture.service';
import { RoomRepository } from './repository/room.repository';
import { PictureRepository } from './repository/picture.repository';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', '..', '/uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [RoomController],
  providers: [RoomService, PictureService, RoomRepository, PictureRepository],
  exports: [RoomService],
})
export class RoomModule {}
