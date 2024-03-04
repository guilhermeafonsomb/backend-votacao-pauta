import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { AddVoteDTO } from './models/voteModels';
import { VoteService } from './vote.service';

@ApiTags('vote')
@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Patch('/open/:agendaId')
  @ApiParam({
    name: 'agendaId',
    required: true,
    type: String,
    description: 'ID da pauta',
  })
  async openVotingSession(@Param('agendaId') agendaId: string) {
    return await this.voteService.openVotingSession(agendaId);
  }

  @Patch('/close/:agendaId')
  @ApiParam({
    name: 'agendaId',
    required: true,
    type: String,
    description: 'ID da pauta',
  })
  async closeVotingSession(@Param('agendaId') agendaId: string) {
    return await this.voteService.closeVotingSession(agendaId);
  }

  @Post()
  @ApiBody({ type: AddVoteDTO, description: 'Adicionar um novo voto' })
  async addVote(@Body() payload: AddVoteDTO) {
    return await this.voteService.addVote(payload);
  }
}
