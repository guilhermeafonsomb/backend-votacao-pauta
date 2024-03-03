import { HttpException, Injectable } from '@nestjs/common';
import { PrismaErrorCode } from '../../utils/apiError';
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

  async findOne(id: string) {
    try {
      const category = await this.categoryRepository.findOne(id);

      return category;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async update(id: string, data: CategoryDTO) {
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

  async delete(id: string) {
    try {
      const category = await this.categoryRepository.findOne(id);

      if (!category) {
        throw new Error('Category does not exist');
      }

      return await this.categoryRepository.delete(id);
    } catch (error) {
      console.log(error);
      if (error.code === PrismaErrorCode.ForeignKeyConstraintFailed) {
        throw new HttpException(
          'Essa categoria esta sendo usada em alguma pauta.',
          500,
        );
      }
      throw new HttpException(error, 500);
    }
  }
}
