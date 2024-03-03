import { Category } from 'src/modules/Category/models/categoryModels';

export type AgendaDTO = {
  title: string;
  duration: number;
  category: Category;
};

export type Agenda = {
  id: string;
  title: string;
  category: Category;
  duration: number;
  open: boolean;
  yesVotes: number;
  noVotes: number;
};
