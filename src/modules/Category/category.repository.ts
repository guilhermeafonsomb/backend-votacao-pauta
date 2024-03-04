import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CategoryDTO } from './models/categoryModels';

@Injectable()
export class CategoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CategoryDTO) {
    const category = await this.prisma.category.create({
      data: {
        title: data.title,
      },
    });

    return category;
  }

  async findAll() {
    const categories = await this.prisma.category.findMany();

    return categories;
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findFirst({
      where: { id },
    });

    return category;
  }

  async findByTitle(title: string) {
    const category = await this.prisma.category.findUnique({
      where: { title },
    });

    return category;
  }

  async update(categoryId: string, data: CategoryDTO) {
    const categoryUpdated = await this.prisma.category.update({
      where: { id: categoryId },
      data,
    });

    return categoryUpdated;
  }

  async delete(categoryId: string) {
    await this.prisma.category.delete({
      where: { id: categoryId },
    });
  }
}
