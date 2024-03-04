import { HttpException, Injectable } from '@nestjs/common';
import { PrismaErrorCode } from 'src/utils/apiError';
import { AddVoteDTO } from './models/voteModels';
import { VoteRepository } from './vote.repository';

@Injectable()
export class VoteService {
  constructor(private voteRepository: VoteRepository) {}

  async openVotingSession(agendaId: string) {
    try {
      const openSession = await this.voteRepository.openVotingSession(agendaId);

      const duration = openSession.duration;

      setTimeout(async () => {
        await this.closeVotingSession(agendaId);
      }, duration);

      return openSession;
    } catch (error) {
      if (error.code === PrismaErrorCode.ServerError) {
        throw new HttpException('Erro ao abrir sessão.', 500);
      }
      throw new HttpException(error, 500);
    }
  }

  async closeVotingSession(agendaId: string) {
    try {
      const closeSession =
        await this.voteRepository.closeVotingSession(agendaId);

      return closeSession;
    } catch (error) {
      if (error.code === PrismaErrorCode.ServerError) {
        throw new HttpException('Erro ao fechar sessão.', 500);
      }
      throw new HttpException(error, 500);
    }
  }

  async addVote(payload: AddVoteDTO) {
    try {
      const addVote = await this.voteRepository.addVote(payload);

      return addVote;
    } catch (error) {
      if (error.code === PrismaErrorCode.ServerError) {
        throw new HttpException('Erro ao cadastrar voto.', 500);
      }
      throw new HttpException(error, 500);
    }
  }
}
