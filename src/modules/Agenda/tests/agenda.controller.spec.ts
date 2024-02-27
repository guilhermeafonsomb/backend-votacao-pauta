import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/PrismaService';
import { AgendaDTO } from 'src/modules/Agenda/models/agendaModels';
import { AgendaController } from '../agenda.controller';
import { AgendaService } from '../agenda.service';
import { mockAgenda, mockAgendaDTO, mockAgendas } from './agenda.mock';

describe('AgendaController', () => {
  let controller: AgendaController;
  let service: AgendaService;
  let prisma: PrismaService;

  const agendaArray = mockAgendas;

  const singleAgendar = mockAgenda;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgendaController],
      providers: [
        PrismaService,
        {
          provide: AgendaService,
          useValue: {
            create: jest.fn((dto: AgendaDTO) => ({
              id: Date.now(), // Simulating auto-generated ID
              ...dto,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            })),
            findAll: jest.fn().mockResolvedValue(mockAgendas),
            findOne: jest.fn().mockResolvedValue(singleAgendar),
            update: jest
              .fn()
              .mockImplementation((id: number, dto: AgendaDTO) => ({
                id,
                ...dto,
                updatedAt: new Date().toISOString(), // Simulate update timestamp
              })),
            delete: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<AgendaController>(AgendaController);
    service = module.get<AgendaService>(AgendaService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should create a agenda', async () => {
    const newAgendaDto: AgendaDTO = mockAgendaDTO;
    const result = await controller.create(newAgendaDto);
    expect(result).toEqual(expect.objectContaining(newAgendaDto));
    expect(service.create).toHaveBeenCalledWith(newAgendaDto);
  });

  it('should find all agendas', async () => {
    await expect(controller.findAll()).resolves.toEqual(agendaArray);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one agenda', async () => {
    const id = '1';
    await expect(controller.findOne(id)).resolves.toEqual(singleAgendar);
    expect(service.findOne).toHaveBeenCalledWith(Number(id));
  });

  it('should update a agenda', async () => {
    const updatedAgendaDto: AgendaDTO = mockAgendaDTO;
    const id = 1;
    await expect(
      controller.update(id.toString(), updatedAgendaDto),
    ).resolves.toEqual({
      id,
      ...updatedAgendaDto,
      updatedAt: expect.any(String),
    });
    expect(service.update).toHaveBeenCalledWith(id, updatedAgendaDto);
  });

  it('should remove a agenda', async () => {
    const id = '1';
    await expect(controller.delete(id)).resolves.toEqual({ deleted: true });
    expect(service.delete).toHaveBeenCalledWith(Number(id));
  });
});
