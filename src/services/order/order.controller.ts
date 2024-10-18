import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { OrderService } from './service/order.service';
import { Public } from 'lib/decorators/public.decorator';
import { OrderResponse } from './response/order.response';
import { CreateOrderDto, FilterOrdersQueryDto, UpdateOrderDto } from './dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // --------------- Add Order --------------- //
  @Public()
  @Post('create-order')
  async createOrder(@Body() dto: CreateOrderDto): Promise<OrderResponse> {
    return this.orderService.createOrder(dto);
  }

  // --------------- Get All Order --------------- //
  @Public()
  @Get('get-all-orders')
  async getAllOrders(
    @Query() query: FilterOrdersQueryDto,
  ): Promise<OrderResponse[]> {
    return this.orderService.getAllOrders(query);
  }

  // --------------- Get Order by id--------------- //
  @Public()
  @Get('get-order-by-id/:id')
  async getOrderById(@Param('id') id: string): Promise<OrderResponse> {
    return this.orderService.getOrderById(+id);
  }

  // ------------------------------ Management Order ------------------------------ //

  //  --------------- Delete Order --------------- //
  @Delete('delete-order/:id')
  async deleteOrder(@Param('id') id: string): Promise<boolean> {
    return this.orderService.deleteOrder(+id);
  }

  // --------------- Update Order --------------- //
  @Put('update-order/:id')
  async updateOrder(
    @Param('id') id: string,
    @Body() dto: UpdateOrderDto,
  ): Promise<OrderResponse> {
    return this.orderService.updateOrder(+id, dto);
  }

  // --------------- Update Order satus --------------- //
  //@Put('update-order-status/:id')
  //async updateOrderStatus(
  //  @Param('id') id: string,
  //  @Body() status: UpdateOrderStatusDto,
  //): Promise<UpdateOrderStatusDto> {
  //  return this.orderService.updateOrderStatus(+id, status);
  //}
}
