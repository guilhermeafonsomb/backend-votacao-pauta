import { ApiProperty } from '@nestjs/swagger';

export class AddVoteDTO {
  @ApiProperty({
    example: '1',
    description: 'Identificador único da pauta',
  })
  agendaId: string;

  @ApiProperty({
    example: '1',
    description: 'Identificador único do usuário',
  })
  userId: string;

  @ApiProperty({
    example: 'SIM',
    description: 'Voto do usuário',
  })
  vote: string;
}
