import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './service/order.service';
import { EmailsModule } from '../mailer/mailer.module';
import { RoomModule } from '../room/room.module';
import { OrderRepository } from './repository/order.repository';

@Module({
  imports: [EmailsModule, RoomModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
