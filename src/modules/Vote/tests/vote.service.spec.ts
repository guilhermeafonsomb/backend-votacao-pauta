import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { VoteRepository } from '../vote.repository';
import { VoteService } from '../vote.service';

describe('VoteService', () => {
  let service: VoteService;
  let repository: VoteRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VoteService,
        {
          provide: VoteRepository,
          useValue: {
            openVotingSession: jest.fn().mockResolvedValue({ duration: 10000 }),
            closeVotingSession: jest.fn(),
            addVote: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VoteService>(VoteService);
    repository = module.get<VoteRepository>(VoteRepository);
  });

  it('should open voting session', async () => {
    const agendaId = 1;
    await service.openVotingSession(agendaId);
    expect(repository.openVotingSession).toHaveBeenCalledWith(agendaId);
  });

  it('should close voting session', async () => {
    const agendaId = 1;
    await service.closeVotingSession(agendaId);
    expect(repository.closeVotingSession).toHaveBeenCalledWith(agendaId);
  });

  it('should handle errors when opening voting session', async () => {
    const agendaId = 1;
    repository.openVotingSession = jest
      .fn()
      .mockRejectedValue(new Error('Simulated error'));

    await expect(service.openVotingSession(agendaId)).rejects.toThrow(
      HttpException,
    );
  });
});
