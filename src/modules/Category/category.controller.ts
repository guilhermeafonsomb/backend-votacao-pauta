import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryDTO } from './models/categoryModels';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiBody({ type: CategoryDTO, description: 'Criar uma nova categoria' })
  async create(@Body() data: CategoryDTO) {
    return await this.categoryService.create(data);
  }

  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'ID da categoria',
  })
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: CategoryDTO, description: 'Editar uma nova categoria' })
  async update(@Param('id') id: string, @Body() data: CategoryDTO) {
    return await this.categoryService.update(id, data);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'ID da categoria',
  })
  async delete(@Param('id') id: string) {
    return await this.categoryService.delete(id);
  }
}
