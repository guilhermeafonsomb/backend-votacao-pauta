import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/PrismaService';
import { UserModelDTO } from '../models/userModel';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { mockUser, mockUsers } from './user.mock';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let prisma: PrismaService;

  const userArray = mockUsers;

  const singleUser = mockUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        PrismaService,
        {
          provide: UserService,
          useValue: {
            create: jest.fn((dto: UserModelDTO) => ({
              id: Date.now(), // Simulating auto-generated ID
              ...dto,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            })),
            findAll: jest.fn().mockResolvedValue(userArray),
            findOne: jest.fn().mockResolvedValue(singleUser),
            update: jest
              .fn()
              .mockImplementation((id: string, dto: UserModelDTO) => ({
                id,
                ...dto,
                updatedAt: new Date().toISOString(), // Simulate update timestamp
              })),
            delete: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const newUserDto: UserModelDTO = { name: 'New User' };
    const result = await controller.create(newUserDto);
    expect(result).toEqual(expect.objectContaining(newUserDto));
    expect(service.create).toHaveBeenCalledWith(newUserDto);
  });

  it('should find all users', async () => {
    await expect(controller.findAll()).resolves.toEqual(userArray);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one user', async () => {
    const id = '1';
    await expect(controller.findOne(id)).resolves.toEqual(singleUser);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should update a user', async () => {
    const updatedUserDto: UserModelDTO = { name: 'Updated Name' };
    const id = '1';
    await expect(controller.update(id, updatedUserDto)).resolves.toEqual({
      id,
      ...updatedUserDto,
      updatedAt: expect.any(String),
    });
    expect(service.update).toHaveBeenCalledWith(id, updatedUserDto);
  });

  it('should remove a user', async () => {
    const id = '1';
    await expect(controller.delete(id)).resolves.toEqual({ deleted: true });
    expect(service.delete).toHaveBeenCalledWith(id);
  });
});
