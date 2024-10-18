import { BadRequestException, Injectable } from '@nestjs/common';
import { Admin } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AdminRepository } from '../repository/admin.repository';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  // --------------- Create Admin --------------- //
  async save(admin: Partial<Admin>) {
    const hashPassword = this.hashPassword(admin.password);
    const existAdmin = await this.adminRepository.findIdOrLogin(admin.login);
    if (existAdmin) {
      throw new BadRequestException('Такой логин уже существует!');
    }
    return await this.adminRepository.create({
      login: admin.login,
      password: hashPassword,
    });
  }

  // --------------- Find Admin --------------- //
  async findOneAdmin(idOrLogin: string) {
    return await this.adminRepository.findIdOrLogin(idOrLogin);
  }

  // --------------- Hashing Password --------------- //
  private hashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }
}
