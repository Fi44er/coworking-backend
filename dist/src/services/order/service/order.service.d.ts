import { OrderResponse } from '../response/order.response';
import { EmailService } from 'src/services/mailer/mailer.service';
import { OrderRepository } from '../repository/order.repository';
import { RoomService } from 'src/services/room/service/room.service';
import { CreateOrderDto, FilterOrdersQueryDto, UpdateOrderDto } from '../dto';
export declare class OrderService {
    private readonly emailService;
    private readonly orderRepository;
    private readonly roomService;
    constructor(emailService: EmailService, orderRepository: OrderRepository, roomService: RoomService);
    createOrder(dto: CreateOrderDto): Promise<OrderResponse>;
    getAllOrders(query: FilterOrdersQueryDto): Promise<OrderResponse[]>;
    getOrderById(id: number): Promise<OrderResponse>;
    updateOrder(id: number, dto: UpdateOrderDto): Promise<OrderResponse>;
    deleteOrder(id: number): Promise<boolean>;
    deleteOverdueOrders(): Promise<void>;
}
