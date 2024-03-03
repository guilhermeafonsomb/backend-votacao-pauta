import { Agenda, AgendaDTO } from 'src/modules/Agenda/models/agendaModels';

export const mockAgendas: Agenda[] = [
  {
    id: '1',
    title: 'testing title',
    duration: 60000,
    open: false,
    category: 'testing',
    yesVotes: 2,
    noVotes: 3,
  },
  {
    id: '2',
    title: 'testing',
    duration: 60000,
    category: 'testing',

    open: true,
    yesVotes: 0,
    noVotes: 3,
  },
];

export const mockAgenda: Agenda = {
  id: '2',
  title: 'testing',
  category: 'testing',
  duration: 60000,
  open: true,
  yesVotes: 0,
  noVotes: 3,
};

export const mockAgendaDTO: AgendaDTO = {
  title: 'testing',
  duration: 60000,
  category: 'testing',
};

export const mockAgendaRepository = () => ({
  create: jest.fn(),
  findByCategory: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findByTitle: jest.fn(),
});
