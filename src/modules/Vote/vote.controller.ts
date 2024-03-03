import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { AddVoteDTO } from './models/voteModels';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Patch('/open/:agendaId')
  async openVotingSession(@Param('agendaId') agendaId: string) {
    return await this.voteService.openVotingSession(agendaId);
  }

  @Patch('/close/:agendaId')
  async closeVotingSession(@Param('agendaId') agendaId: string) {
    return await this.voteService.closeVotingSession(agendaId);
  }

  @Post()
  async addVote(@Body() payload: AddVoteDTO) {
    return await this.voteService.addVote(payload);
  }
}
