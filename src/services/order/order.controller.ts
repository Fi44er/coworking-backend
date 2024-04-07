import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './DTO/CreateOrder.dto';
import { Public } from 'lib/decorators/public.decorator';
import { OrderResponse } from './Response/Order.response';
import { UpdateOrderDto } from './DTO/UpdateOrder.dto';
import { ApiTags, ApiBody, ApiParam, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';

@Public()
@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // --------------- Add Order --------------- //
  @Post('create-order')
  @ApiOperation({ summary: 'Create order' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: 'Order created', type: OrderResponse })
  async createOrder(@Body() dto: CreateOrderDto): Promise<OrderResponse> {
    return this.orderService.createOrder(dto);
  }

  // --------------- Get All Order --------------- //
  @Get('get-all-orders')
  @ApiOperation({ summary: 'Get all orders', description: 'Returns all orders' })
  @ApiTags('Order')
  @ApiResponse({ status: 200, description: 'Returns all orders', type: OrderResponse, isArray: true })
  async getAllOrders(): Promise<OrderResponse[]> {
    return this.orderService.getAllOrders();
  }

  // --------------- Get Order by id--------------- //
  @Get('get-order-by-id/:id')
  @ApiOperation({ summary: 'Get order by ID', description: 'Returns an order based on the provided ID' })
  @ApiTags('Order')
  @ApiParam({ name: 'id', type: 'string', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Returns the order', type: OrderResponse })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async getOrderById(@Param('id') id: string): Promise<OrderResponse> {
    return this.orderService.getOrderById(+id);
  }

    // ------------------------------ Management Order ------------------------------ //

  //  --------------- Delete Order --------------- //
  @Delete('delete-order/:id')
  @ApiOperation({ summary: 'Delete order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order deleted', type: Boolean })

  async deleteOrder(@Param('id') id: string): Promise<boolean> {
    return this.orderService.deleteOrder(+id);
  }

  // --------------- Update Order --------------- //
  @Put('update-order/:id')
  @ApiOperation({ summary: 'Update order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiBody({ type: UpdateOrderDto })
  @ApiResponse({ status: 200, description: 'Order updated', type: OrderResponse })

  async updateOrder(@Param('id') id: string, @Body() dto: UpdateOrderDto): Promise<OrderResponse> {
    return this.orderService.updateOrder(+id, dto);
  }

  // --------------- Update Order satus --------------- //
  @Put('update-order-status/:id')
  async updateOrderStatus(@Param('id') id: string, @Body() status: OrderStatus): Promise<OrderStatus> {
    return this.orderService.updateOrderStatus(+id, status)
  }
}