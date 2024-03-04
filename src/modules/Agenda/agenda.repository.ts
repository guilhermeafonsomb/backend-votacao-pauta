import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { AgendaDTO } from './models/agendaModels';

@Injectable()
export class AgendaRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: AgendaDTO) {
    const agenda = await this.prisma.agenda.create({
      data: {
        title: data.title,
        duration: data.duration || 60000,
        category: {
          connect: { id: data.category.id },
        },
      },
    });

    return agenda;
  }

  async findByCategory(categoryId: string) {
    const agenda = await this.prisma.agenda.findMany({
      where: { category: { id: categoryId } },
    });

    return agenda;
  }

  async findByTitle(title: string) {
    const agenda = await this.prisma.agenda.findFirst({
      where: { title },
    });

    return agenda;
  }

  async update(agendaId: string, data: AgendaDTO) {
    const agendaUpdated = await this.prisma.agenda.update({
      where: { id: agendaId },
      data: {
        ...data,
        category: { connect: { id: data.category.id } },
      },
    });

    return agendaUpdated;
  }

  async delete(agendaId: string) {
    await this.prisma.agenda.delete({
      where: { id: agendaId },
    });
  }

  async findAll(status: string) {
    if (status === 'close') {
      const closeAgendas = await this.prisma.agenda.findMany({
        where: { open: false },
        include: { category: true },
      });

      return closeAgendas;
    }

    if (status === 'false') {
      const closeAgendas = await this.prisma.agenda.findMany({
        where: { open: null },
        include: { category: true },
      });

      return closeAgendas;
    }

    const allAgendas = await this.prisma.agenda.findMany({
      where: { open: true },
      include: { category: true },
    });
    return allAgendas;
  }

  async findOne(agendaId: string) {
    const agendaById = await this.prisma.agenda.findUnique({
      where: { id: agendaId },
      include: { category: true },
    });

    return agendaById;
  }
}
