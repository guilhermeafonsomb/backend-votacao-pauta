import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, CategoryRepository],
})
export class CategoryModule {}
