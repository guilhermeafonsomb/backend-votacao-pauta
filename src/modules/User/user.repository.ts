import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserModelDTO } from 'src/modules/User/models/userModel';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: UserModelDTO) {
    return await this.prisma.user.create({ data });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const userById = await this.prisma.user.findUnique({ where: { id } });

    return userById;
  }

  async update(id: number, data: UserModelDTO) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
