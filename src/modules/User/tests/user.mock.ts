import { UserModel } from '../models/userModel';

export const mockUsers: UserModel[] = [
  {
    id: '1',
    name: 'User One',
    createdAt: '2020-01-01',
    updatedAt: '2020-01-02',
  },
  {
    id: '2',
    name: 'User Two',
    createdAt: '2020-02-01',
    updatedAt: '2020-02-02',
  },
];

export const mockUser: UserModel = {
  id: '1',
  name: 'User One',
  createdAt: '2020-01-01',
  updatedAt: '2020-01-02',
};

export const mockUserRepository = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});
