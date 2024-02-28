import { Test, TestingModule } from '@nestjs/testing';
import { VoteController } from '../vote.controller';
import { VoteService } from '../vote.service';
import { addVoteMock } from './vote.mock';

describe('VoteController', () => {
  let controller: VoteController;
  let service: VoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoteController],
      providers: [
        {
          provide: VoteService,
          useValue: {
            openVotingSession: jest.fn(),
            closeVotingSession: jest.fn(),
            addVote: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VoteController>(VoteController);
    service = module.get<VoteService>(VoteService);
  });

  it('should call openVotingSession', async () => {
    const agendaId = '1';
    await controller.openVotingSession(agendaId);
    expect(service.openVotingSession).toHaveBeenCalledWith(Number(agendaId));
  });

  it('should call addVote on service with the payload', async () => {
    const payload = addVoteMock;
    await controller.addVote(payload);
    expect(service.addVote).toHaveBeenCalledWith(payload);
  });

  it('should call closeVotingSession on service with numeric agendaId', async () => {
    const agendaId = '2';
    await controller.closeVotingSession(agendaId);
    expect(service.closeVotingSession).toHaveBeenCalledWith(Number(agendaId));
  });

  it('should call addVote on service with the correct payload', async () => {
    const payload = addVoteMock;
    await controller.addVote(payload);
    expect(service.addVote).toHaveBeenCalledWith(payload);
  });
});
