import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { AddVoteDTO } from './models/voteModels';

@Injectable()
export class VoteRepository {
  constructor(private prisma: PrismaService) {}

  async openVotingSession(agendaId: number) {
    const openVotingSession = await this.prisma.agenda.update({
      where: { id: agendaId },
      data: {
        open: true,
        startTime: new Date(),
      },
    });

    return openVotingSession;
  }

  async closeVotingSession(agendaId: number) {
    const closeVotingSession = await this.prisma.agenda.update({
      where: { id: agendaId },
      data: {
        open: false,
      },
    });

    const agenda = await this.prisma.agenda.findUnique({
      where: { id: agendaId },
      select: { yesVotes: true, noVotes: true },
    });

    if (
      agenda.yesVotes === agenda.noVotes ||
      agenda.yesVotes < agenda.noVotes
    ) {
      await this.prisma.agenda.update({
        where: { id: agendaId },
        data: { approved: false },
      });
    } else {
      await this.prisma.agenda.update({
        where: { id: agendaId },
        data: { approved: true },
      });
    }

    return closeVotingSession;
  }

  async addVote(payload: AddVoteDTO) {
    const existingVote = await this.prisma.vote.findUnique({
      where: {
        userId_agendaId: {
          userId: payload.userId,
          agendaId: payload.agendaId,
        },
      },
    });

    if (existingVote) {
      throw new Error('User has already voted on this agenda.');
    }

    await this.prisma.vote.create({
      data: {
        userId: payload.userId,
        agendaId: payload.agendaId,
        value: payload.vote,
      },
    });

    if (payload.vote === 'SIM') {
      await this.prisma.agenda.update({
        where: { id: payload.agendaId },
        data: { yesVotes: { increment: 1 } },
      });
    } else {
      await this.prisma.agenda.update({
        where: { id: payload.agendaId },
        data: { noVotes: { increment: 1 } },
      });
    }
  }
}
