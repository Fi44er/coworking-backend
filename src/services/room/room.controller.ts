import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'lib/decorators/public.decorator';
import { CreateRoomResponse, RoomResponse } from './response/room.response';
import { RoomService } from './service/room.service';
import { GetPicturesNameResponse } from './response/picture.response';
import { PictureService } from './service/picture.service';
import { CreateRoomDto } from './dto';

@ApiTags('rooms')
@Controller('room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly pictureService: PictureService,
  ) {}
  // ------------------------------ Room ------------------------------ //

  // --------------- Add Room --------------- //
  @Post('add-room')
  @ApiOperation({ summary: 'Add a new room' })
  @ApiBody({ type: CreateRoomDto })
  @ApiResponse({
    status: 201,
    description: 'Room successfully created',
    type: CreateRoomResponse,
  })
  async addRoom(@Body() dto: CreateRoomDto): Promise<CreateRoomResponse> {
    return this.roomService.create(dto);
  }

  // --------------- Get All rooms --------------- //

  @Public()
  @Get('get-all-rooms')
  async getAllRooms(): Promise<RoomResponse[]> {
    return this.roomService.getAll();
  }

  // --------------- Get Room by id --------------- //
  @Public()
  @Get('get-room/:id')
  @ApiOperation({ summary: 'Get room by id' })
  @ApiParam({ name: 'id', description: 'Room ID' })
  @ApiResponse({ status: 200, description: 'Room found', type: RoomResponse })
  async getRoom(@Param('id') roomId: string): Promise<RoomResponse> {
    return this.roomService.getById(+roomId);
  }

  // --------------- Update Room by id --------------- //
  @Put('update-room/:id')
  @ApiOperation({ summary: 'Update room by id' })
  @ApiParam({ name: 'id', description: 'Room ID' })
  @ApiBody({ type: CreateRoomDto })
  @ApiResponse({
    status: 200,
    description: 'Room successfully updated',
    type: CreateRoomResponse,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async updateRoom(
    @Param('id') id: number,
    @Body() dto: Partial<CreateRoomDto>,
  ): Promise<CreateRoomResponse> {
    if (!id) throw new BadRequestException('Room ID not provided');
    return this.roomService.update(+id, dto);
  }

  // --------------- Delete Room by id --------------- //
  @Delete('delete-room/:id')
  @ApiOperation({ summary: 'Delete room by id' })
  @ApiParam({ name: 'id', description: 'Room ID' })
  @ApiResponse({ status: 200, description: 'Room successfully deleted' })
  async deleteRoom(@Param('id') roomId: string): Promise<boolean> {
    return this.roomService.delete(+roomId);
  }

  // ------------------------------ Picture ------------------------------ //

  // --------------- Upload Picture by room id --------------- //
  @Post('upload-picture/:id')
  @ApiOperation({ summary: 'Upload picture by room id' })
  @ApiParam({ name: 'id', description: 'Room ID' })
  @UseInterceptors(FilesInterceptor('image'))
  @ApiResponse({
    status: 200,
    description: 'Pictures successfully uploaded',
    type: [GetPicturesNameResponse],
  })
  async uploadPicture(
    @Param('id') roomId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<GetPicturesNameResponse[]> {
    return this.pictureService.upload(+roomId, files);
  }

  // --------------- Get Names picture by room id --------------- //
  @Public()
  @Get('get-names-picture-by-room-id/:id')
  @ApiOperation({ summary: 'Get names of pictures by room id' })
  @ApiParam({ name: 'id', description: 'Room ID' })
  @ApiResponse({
    status: 200,
    description: 'Pictures names retrieved',
    type: [GetPicturesNameResponse],
  })
  async getNamesPictureByRoomId(
    @Param('id') roomId: string,
  ): Promise<GetPicturesNameResponse[]> {
    return this.pictureService.getByRoomID(+roomId);
  }

  // --------------- Delete Picture by id --------------- //
  @Delete('delete-picture/:name')
  @ApiOperation({ summary: 'Delete picture by name' })
  @ApiParam({ name: 'name', description: 'Picture name' })
  @ApiResponse({ status: 200, description: 'Picture deleted', type: Boolean })
  async deletePicture(@Param('name') pictureName: string): Promise<boolean> {
    return this.pictureService.delete(pictureName);
  }
}
