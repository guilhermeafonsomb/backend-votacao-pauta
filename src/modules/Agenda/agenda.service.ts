import { HttpException, Injectable } from '@nestjs/common';
import { PrismaErrorCode } from 'src/utils/apiError';
import { AgendaRepository } from './agenda.repository';
import { AgendaDTO } from './models/agendaModels';

@Injectable()
export class AgendaService {
  constructor(private agendaRepository: AgendaRepository) {}

  async create(data: AgendaDTO) {
    try {
      const agendaExist = await this.agendaRepository.findByTitle(data.title);

      if (agendaExist) {
        throw new Error('Agenda already exists');
      }

      const agenda = await this.agendaRepository.create(data);

      return agenda;
    } catch (error) {
      if (error.code === PrismaErrorCode.UniqueConstraintFailed) {
        throw new HttpException('Já existe uma pauta com esse nome.', 500);
      }
      throw new HttpException(error, 500);
    }
  }

  async findByCategory(categoryId: string) {
    try {
      const agendas = await this.agendaRepository.findByCategory(categoryId);

      return agendas;
    } catch (error) {
      if (error.code === PrismaErrorCode.RecordNotFound) {
        throw new HttpException('Erro ao consultar pautas por categoria.', 500);
      }
      throw new HttpException(error, 500);
    }
  }

  async findAll(status: string) {
    try {
      const agendas = await this.agendaRepository.findAll(status);

      return agendas;
    } catch (error) {
      if (error.code === PrismaErrorCode.RecordNotFound) {
        throw new HttpException('Erro ao consultar pautas.', 500);
      }
      throw new HttpException(error, 500);
    }
  }

  async findOne(id: string) {
    try {
      const agenda = await this.agendaRepository.findOne(id);

      return agenda;
    } catch (error) {
      if (error.code === PrismaErrorCode.RecordNotFound) {
        throw new HttpException('Erro ao consultar pauta.', 500);
      }
      throw new HttpException(error, 500);
    }
  }

  async update(id: string, data: AgendaDTO) {
    try {
      const agendaExist = await this.agendaRepository.findByTitle(data.title);

      if (agendaExist) {
        throw new Error('Agenda already exists');
      }

      const agenda = await this.agendaRepository.findOne(id);

      if (!agenda) {
        throw new Error('Agenda does not exist');
      }

      return await this.agendaRepository.update(id, data);
    } catch (error) {
      if (error.code === PrismaErrorCode.UniqueConstraintFailed) {
        throw new HttpException('Já existe uma pauta com esse nome.', 500);
      }
      throw new HttpException(error, 500);
    }
  }

  async delete(id: string) {
    try {
      const agenda = await this.agendaRepository.findOne(id);

      if (!agenda) {
        throw new Error('Agenda does not exist');
      }

      return await this.agendaRepository.delete(id);
    } catch (error) {
      if (error.code === PrismaErrorCode.ServerError) {
        throw new HttpException('Erro ao deletar pauta.', 500);
      }
      throw new HttpException(error, 500);
    }
  }
}
