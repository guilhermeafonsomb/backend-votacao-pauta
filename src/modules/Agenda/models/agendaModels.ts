import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/modules/Category/models/categoryModels';

export class Agenda {
  @ApiProperty({
    example: '1',
    description: 'Identificador único da pauta',
  })
  id: string;

  @ApiProperty({
    example: 'Reunião de Planejamento',
    description: 'O título da pauta',
  })
  title: string;

  @ApiProperty({
    type: () => Category,
    description: 'Categoria associada à pauta',
  })
  category: Category;

  @ApiProperty({
    example: 60000,
    description: 'Duração da pauta em milissegundos',
    default: 60000,
  })
  duration: number;

  @ApiProperty({
    example: true,
    description: 'Indica se a pauta está aberta ou fechada',
  })
  open: boolean;

  @ApiProperty({
    example: 0,
    description: 'Número de votos positivos',
  })
  yesVotes: number;

  @ApiProperty({
    example: 0,
    description: 'Número de votos negativos',
  })
  noVotes: number;
}

export class AgendaDTO {
  @ApiProperty({
    example: 'Reunião de Planejamento',
    description: 'O título da pauta',
  })
  title: string;

  @ApiProperty({
    example: 60000,
    description: 'Duração da pauta em milissegundos',
    default: 60000,
  })
  duration: number;

  @ApiProperty({
    type: () => Category,
    description: 'Categoria associada à pauta',
  })
  category: Category;
}
