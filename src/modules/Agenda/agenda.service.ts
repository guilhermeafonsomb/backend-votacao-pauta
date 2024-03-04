import { HttpException, Injectable } from '@nestjs/common';
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
      throw new HttpException(error, 500);
    }
  }

  async findByCategory(categoryId: string) {
    try {
      const agendas = await this.agendaRepository.findByCategory(categoryId);

      return agendas;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findAll(status: string) {
    try {
      const agendas = await this.agendaRepository.findAll(status);

      return agendas;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findOne(id: string) {
    try {
      const agenda = await this.agendaRepository.findOne(id);

      return agenda;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async update(id: string, data: AgendaDTO) {
    try {
      const agenda = await this.agendaRepository.findOne(id);

      if (!agenda) {
        throw new Error('Agenda does not exist');
      }

      return await this.agendaRepository.update(id, data);
    } catch (error) {
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
      throw new HttpException(error, 500);
    }
  }
}
