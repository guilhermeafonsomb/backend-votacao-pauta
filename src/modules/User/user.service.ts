import { HttpException, Injectable } from '@nestjs/common';
import { UserModelDTO } from 'src/modules/User/models/userModel';
import { PrismaErrorCode } from 'src/utils/apiError';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(data: UserModelDTO) {
    try {
      const user = await this.userRepository.create(data);

      return user;
    } catch (error) {
      if (error.code === PrismaErrorCode.ServerError) {
        throw new HttpException('Erro ao criar usuário.', 500);
      }
      throw new HttpException(error, 500);
    }
  }

  async findAll() {
    try {
      const allUsers = await this.userRepository.findAll();

      if (!allUsers) {
        throw new Error('Users do not exist.');
      }

      return allUsers;
    } catch (error) {
      if (error.code === PrismaErrorCode.RecordNotFound) {
        throw new HttpException('Erro ao consultar usuários.', 500);
      }
      throw new HttpException(error, 500);
    }
  }

  async findOne(id: string) {
    try {
      const userById = await this.userRepository.findOne(id);

      if (!userById) {
        throw new Error('User does not exist.');
      }

      return userById;
    } catch (error) {
      if (error.code === PrismaErrorCode.RecordNotFound) {
        throw new HttpException('Erro ao consultar usuário.', 500);
      }
      throw new HttpException(error, 500);
    }
  }

  async update(id: string, data: UserModelDTO) {
    try {
      const userExists = await this.userRepository.findOne(id);

      if (!userExists) {
        throw new Error('User does not exist');
      }

      return await this.userRepository.update(id, data);
    } catch (error) {
      if (error.code === PrismaErrorCode.ServerError) {
        throw new HttpException('Erro ao atualizar usuário.', 500);
      }
      throw new HttpException(error, 500);
    }
  }

  async delete(id: string) {
    try {
      const userExists = await this.userRepository.findOne(id);

      if (!userExists) {
        throw new Error('usere does not exist');
      }

      await this.userRepository.delete(id);

      return userExists;
    } catch (error) {
      if (error.code === PrismaErrorCode.ServerError) {
        throw new HttpException('Erro ao deletar usuário.', 500);
      }
      throw new HttpException(error, 500);
    }
  }
}
