import { OrderService } from './service/order.service';
import { OrderResponse } from './response/order.response';
import { CreateOrderDto, FilterOrdersQueryDto, UpdateOrderDto } from './dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(dto: CreateOrderDto): Promise<OrderResponse>;
    getAllOrders(query: FilterOrdersQueryDto): Promise<OrderResponse[]>;
    getOrderById(id: string): Promise<OrderResponse>;
    deleteOrder(id: string): Promise<boolean>;
    updateOrder(id: string, dto: UpdateOrderDto): Promise<OrderResponse>;
}
