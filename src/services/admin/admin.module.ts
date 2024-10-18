import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './service/admin.service';
import { AdminRepository } from './repository/admin.repository';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
  exports: [AdminService],
})
export class AdminModule {}
