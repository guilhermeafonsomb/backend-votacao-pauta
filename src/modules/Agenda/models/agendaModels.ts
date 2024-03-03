export type AgendaDTO = {
  title: string;
  duration: number;
  category: string;
};

export type Agenda = {
  id: string;
  title: string;
  category: string;
  duration: number;
  open: boolean;
  yesVotes: number;
  noVotes: number;
};
