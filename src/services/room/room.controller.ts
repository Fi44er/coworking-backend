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
import { RoomService } from './room.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateRoomDto } from './DTO/CreateRoom.dto';
import { GetPicturesNameResponse } from './Response/GetPicturesName.response';
import { RoomResponse } from './Response/Room.response.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRoomResponse } from './Response/CreateRoom.response';
import { Public } from 'lib/decorators/public.decorator';

@ApiTags('rooms')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
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
    return this.roomService.addRoom(dto);
  }

  // --------------- Get All rooms --------------- //

  @Public()
  @Get('get-all-rooms')
  async getAllRooms(): Promise<RoomResponse[]> {
    return this.roomService.getAllRooms();
  }

  // --------------- Get Room by id --------------- //
  @Public()
  @Get('get-room/:id')
  @ApiOperation({ summary: 'Get room by id' })
  @ApiParam({ name: 'id', description: 'Room ID' })
  @ApiResponse({ status: 200, description: 'Room found', type: RoomResponse })
  async getRoom(@Param('id') roomId: string): Promise<RoomResponse> {
    return this.roomService.getRoom(+roomId);
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
    return this.roomService.updateRoom(+id, dto);
  }

  // --------------- Delete Room by id --------------- //
  @Delete('delete-room/:id')
  @ApiOperation({ summary: 'Delete room by id' })
  @ApiParam({ name: 'id', description: 'Room ID' })
  @ApiResponse({ status: 200, description: 'Room successfully deleted' })
  async deleteRoom(@Param('id') roomId: string): Promise<boolean> {
    return this.roomService.deleteRoom(+roomId);
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
    return this.roomService.uploadPicture(+roomId, files);
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
    return this.roomService.getPicturesByRoomId(+roomId);
  }

  // --------------- Delete Picture by id --------------- //
  @Delete('delete-picture/:name')
  @ApiOperation({ summary: 'Delete picture by name' })
  @ApiParam({ name: 'name', description: 'Picture name' })
  @ApiResponse({ status: 200, description: 'Picture deleted', type: Boolean })
  async deletePicture(@Param('name') pictureName: string): Promise<boolean> {
    return this.roomService.deletePicture(pictureName);
  }
}
