import { ApiProperty } from '@nestjs/swagger';

export class UserModelDTO {
  @ApiProperty({
    example: '1',
    description: 'Identificador único do usuário',
  })
  name: string;
}

export class UserModel {
  @ApiProperty({
    example: '1',
    description: 'Identificador único do usuário',
  })
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Nome do usuário',
  })
  name: string;

  @ApiProperty({
    example: '2024-03-04T01:31:09.234Z',
    description: 'Data de criação do usuário',
  })
  createdAt: string;

  @ApiProperty({
    example: '2024-03-04T01:31:09.234Z',
    description: 'Data de atualização do usuário',
  })
  updatedAt: string;
}
