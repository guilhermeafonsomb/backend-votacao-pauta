import { HttpException, Injectable } from '@nestjs/common';
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
      throw new HttpException(error, 500);
    }
  }

  async closeVotingSession(agendaId: string) {
    try {
      const closeSession =
        await this.voteRepository.closeVotingSession(agendaId);

      return closeSession;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async addVote(payload: AddVoteDTO) {
    try {
      const addVote = await this.voteRepository.addVote(payload);

      return addVote;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
