import { Test, TestingModule } from '@nestjs/testing';
import { AgendaDTO } from 'src/modules/Agenda/models/agendaModels';
import { AgendaRepository } from '../agenda.repository';
import { AgendaService } from '../agenda.service';
import { mockAgendaDTO, mockAgendaRepository } from './agenda.mock';

describe('AgendaService', () => {
  let agendaService: AgendaService;
  let agendaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgendaService,
        { provide: AgendaRepository, useFactory: mockAgendaRepository },
      ],
    }).compile();

    agendaService = module.get<AgendaService>(AgendaService);
    agendaRepository = module.get(AgendaRepository);
  });

  it('should successfully create a agenda', async () => {
    agendaRepository.create.mockResolvedValue('someAgenda');
    expect(agendaRepository.create).not.toHaveBeenCalled();
    const createAgendaDto: AgendaDTO = mockAgendaDTO;
    const result = await agendaService.create(createAgendaDto);
    expect(agendaRepository.create).toHaveBeenCalledWith(createAgendaDto);
    expect(result).toEqual('someAgenda');
  });

  it('should find all agendas', async () => {
    agendaRepository.findAll.mockResolvedValue(['agenda1', 'agenda2']);
    expect(agendaRepository.findAll).not.toHaveBeenCalled();
    const result = await agendaService.findAll('false');
    expect(agendaRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(['agenda1', 'agenda2']);
  });

  it('should find one agenda', async () => {
    agendaRepository.findOne.mockResolvedValue('agenda');
    const id = 1;
    expect(agendaRepository.findOne).not.toHaveBeenCalled();
    const result = await agendaService.findOne(id);
    expect(agendaRepository.findOne).toHaveBeenCalledWith(id);
    expect(result).toEqual('agenda');
  });

  it('should update a agenda', async () => {
    agendaRepository.findOne.mockResolvedValue('existingagenda');
    agendaRepository.update.mockResolvedValue('updatedagenda');
    const updateagendaDto: AgendaDTO = mockAgendaDTO;
    const id = 1;
    const result = await agendaService.update(id, updateagendaDto);
    expect(agendaRepository.update).toHaveBeenCalledWith(id, updateagendaDto);
    expect(result).toEqual('updatedagenda');
  });

  it('should delete a agenda', async () => {
    agendaRepository.findOne.mockResolvedValue('existingAgenda');
    agendaRepository.delete.mockResolvedValue(undefined);
    const id = 1;
    await agendaService.delete(id);
    expect(agendaRepository.delete).toHaveBeenCalledWith(id);
  });
});
