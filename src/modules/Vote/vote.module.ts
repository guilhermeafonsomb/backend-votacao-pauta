import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { AgendaRepository } from '../Agenda/agenda.repository';
import { VoteController } from './vote.controller';
import { VoteRepository } from './vote.repository';
import { VoteService } from './vote.service';

@Module({
  controllers: [VoteController],
  providers: [VoteService, VoteRepository, AgendaRepository, PrismaService],
})
export class VoteModule {}
