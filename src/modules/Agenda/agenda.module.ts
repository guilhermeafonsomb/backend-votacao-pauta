import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { AgendaController } from './agenda.controller';
import { AgendaRepository } from './agenda.repository';
import { AgendaService } from './agenda.service';

@Module({
  controllers: [AgendaController],
  providers: [AgendaService, AgendaRepository, PrismaService],
})
export class AgendaModule {}
