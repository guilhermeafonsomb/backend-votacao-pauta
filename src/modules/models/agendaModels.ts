export type AgendaDTO = {
  title: string;
  duration: number;
};

export type Agenda = {
  id: number;
  title: string;
  duration: number;
  open: boolean;
  yesVotes: number;
  noVotes: number;
};
