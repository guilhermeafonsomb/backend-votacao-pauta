import { HttpException, Injectable } from '@nestjs/common';
import { AgendaRepository } from './agenda.repository';
import { AgendaDTO } from './models/agendaModels';

@Injectable()
export class AgendaService {
  constructor(private agendaRepository: AgendaRepository) {}

  async create(data: AgendaDTO) {
    try {
      const agenda = await this.agendaRepository.create(data);

      return agenda;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findAll() {
    try {
      const agendas = await this.agendaRepository.findAll();

      return agendas;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findOne(id: number) {
    try {
      const agenda = await this.agendaRepository.findOne(id);

      return agenda;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async update(id: number, data: AgendaDTO) {
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

  async delete(id: number) {
    try {
      const agenda = await this.agendaRepository.findOne(id);

      if (!agenda) {
        throw new Error('Agenda does not exist');
      }

      return this.agendaRepository.delete(id);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
