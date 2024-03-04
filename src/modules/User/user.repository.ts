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

  async findOne(id: string) {
    const userById = await this.prisma.user.findUnique({ where: { id } });

    return userById;
  }

  async update(id: string, data: UserModelDTO) {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.prisma.user.delete({ where: { id } });
  }
}
