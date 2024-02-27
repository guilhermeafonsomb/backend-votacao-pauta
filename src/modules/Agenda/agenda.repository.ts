import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { Agenda, AgendaDTO } from './models/agendaModels';

@Injectable()
export class AgendaRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: AgendaDTO) {
    const agenda = await this.prisma.agenda.create({
      data: {
        title: data.title,
        duration: data.duration || 60000,
      },
    });

    return agenda;
  }

  async update(agendaId: number, data: AgendaDTO) {
    const agendaUpdated = await this.prisma.agenda.update({
      where: { id: agendaId },
      data,
    });

    return agendaUpdated;
  }

  async delete(agendaId: number) {
    return await this.prisma.agenda.delete({
      where: { id: agendaId },
    });
  }

  async findAll(): Promise<Agenda[]> {
    const allAgendas = await this.prisma.agenda.findMany();
    return allAgendas;
  }

  async findOne(agendaId: number): Promise<Agenda> {
    const agendaById = await this.prisma.agenda.findUnique({
      where: { id: agendaId },
    });

    return agendaById;
  }
}
