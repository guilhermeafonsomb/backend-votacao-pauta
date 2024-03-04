import { Test, TestingModule } from '@nestjs/testing';
import { UserModelDTO } from '../models/userModel';
import { UserRepository } from '../user.repository';
import { UserService } from '../user.service';
import { mockUserRepository } from './user.mock';

describe('UserService', () => {
  let userService: UserService;
  let userRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(UserRepository);
  });

  it('should successfully create a user', async () => {
    userRepository.create.mockResolvedValue('someUser');
    expect(userRepository.create).not.toHaveBeenCalled();
    const createUserDto: UserModelDTO = { name: 'Test User' };
    const result = await userService.create(createUserDto);
    expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
    expect(result).toEqual('someUser');
  });

  it('should find all users', async () => {
    userRepository.findAll.mockResolvedValue(['user1', 'user2']);
    expect(userRepository.findAll).not.toHaveBeenCalled();
    const result = await userService.findAll();
    expect(userRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(['user1', 'user2']);
  });

  it('should find one user', async () => {
    userRepository.findOne.mockResolvedValue('user');
    const id = '1';
    expect(userRepository.findOne).not.toHaveBeenCalled();
    const result = await userService.findOne(id);
    expect(userRepository.findOne).toHaveBeenCalledWith(id);
    expect(result).toEqual('user');
  });

  it('should update a user', async () => {
    userRepository.findOne.mockResolvedValue('existingUser');
    userRepository.update.mockResolvedValue('updatedUser');
    const updateUserDto: UserModelDTO = { name: 'Updated User' };
    const id = '1';
    const result = await userService.update(id, updateUserDto);
    expect(userRepository.update).toHaveBeenCalledWith(id, updateUserDto);
    expect(result).toEqual('updatedUser');
  });

  it('should delete a user', async () => {
    userRepository.findOne.mockResolvedValue('existingUser');
    userRepository.delete.mockResolvedValue(undefined);
    const id = '1';
    await userService.delete(id);
    expect(userRepository.delete).toHaveBeenCalledWith(id);
  });
});
