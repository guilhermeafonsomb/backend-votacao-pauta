import { HttpException, Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CategoryDTO } from './models/categoryModels';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(data: CategoryDTO) {
    try {
      const categoryExist = await this.categoryRepository.findByTitle(
        data.title,
      );

      if (categoryExist) {
        throw new Error('Category already exists');
      }
      const category = await this.categoryRepository.create(data);

      return category;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findAll() {
    try {
      const categories = await this.categoryRepository.findAll();

      return categories;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.categoryRepository.findOne(id);

      return category;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async update(id: number, data: CategoryDTO) {
    try {
      const category = await this.categoryRepository.findOne(id);

      if (!category) {
        throw new Error('Category does not exist');
      }

      const categoryUpdated = await this.categoryRepository.update(id, data);

      return categoryUpdated;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async delete(id: number) {
    try {
      const category = await this.categoryRepository.findOne(id);

      if (!category) {
        throw new Error('Category does not exist');
      }

      return await this.categoryRepository.delete(id);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
