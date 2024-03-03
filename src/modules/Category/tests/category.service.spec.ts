import { Test, TestingModule } from '@nestjs/testing';
import { CategoryRepository } from '../category.repository';
import { CategoryService } from '../category.service';
import { CategoryDTO } from '../models/categoryModels';
import { mockCategoryDTO, mockCategoryRepository } from './category.mock';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let categoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: CategoryRepository, useFactory: mockCategoryRepository },
      ],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get(CategoryRepository);
  });

  it('should successfully create a category', async () => {
    categoryRepository.create.mockResolvedValue('someCategory');
    expect(categoryRepository.create).not.toHaveBeenCalled();
    const createCategoryDto: CategoryDTO = mockCategoryDTO;
    const result = await categoryService.create(createCategoryDto);
    expect(categoryRepository.create).toHaveBeenCalledWith(createCategoryDto);
    expect(result).toEqual('someCategory');
  });

  it('should find all categories', async () => {
    categoryRepository.findAll.mockResolvedValue(['category1', 'category2']);
    expect(categoryRepository.findAll).not.toHaveBeenCalled();
    const result = await categoryService.findAll();
    expect(categoryRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(['category1', 'category2']);
  });

  it('should find one category', async () => {
    categoryRepository.findOne.mockResolvedValue('category');
    const id = 1;
    expect(categoryRepository.findOne).not.toHaveBeenCalled();
    const result = await categoryService.findOne(id);
    expect(categoryRepository.findOne).toHaveBeenCalledWith(id);
    expect(result).toEqual('category');
  });

  it('should update a category', async () => {
    categoryRepository.findOne.mockResolvedValue('existingcategory');
    categoryRepository.update.mockResolvedValue('updatedcategory');
    const updateCategoryDto: CategoryDTO = mockCategoryDTO;
    const id = 1;
    const result = await categoryService.update(id, updateCategoryDto);
    expect(categoryRepository.update).toHaveBeenCalledWith(
      id,
      updateCategoryDto,
    );
    expect(result).toEqual('updatedcategory');
  });

  it('should delete a category', async () => {
    categoryRepository.findOne.mockResolvedValue('deletedcategory');
    categoryRepository.delete.mockResolvedValue(undefined);
    const id = 1;
    await categoryService.delete(id);
    expect(categoryRepository.delete).toHaveBeenCalledWith(id);
  });
});
