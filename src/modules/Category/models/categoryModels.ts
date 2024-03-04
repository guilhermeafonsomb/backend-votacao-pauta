import { ApiProperty } from '@nestjs/swagger';

export class CategoryDTO {
  @ApiProperty({
    example: 'Reunião de Planejamento',
    description: 'O título da categoria',
  })
  title: string;
}

export class Category {
  @ApiProperty({
    example: '1',
    description: 'Identificador único da categoria',
  })
  id: string;

  @ApiProperty({
    example: 'Reunião de Planejamento',
    description: 'O título da categoria',
  })
  title: string;
}
