import { Category, CategoryDTO } from '../models/categoryModels';

export const mockCategoryRepository = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findByTitle: jest.fn(),
});

export const mockCategories: Category[] = [
  {
    id: '1',
    title: 'testing title',
  },
  {
    id: '2',
    title: 'testing',
  },
];

export const mockCategory: Category = {
  id: '2',
  title: 'testing',
};

export const mockCategoryDTO: CategoryDTO = {
  title: 'testing',
};
