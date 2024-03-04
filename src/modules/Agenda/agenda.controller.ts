import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { AgendaService } from './agenda.service';
import { AgendaDTO } from './models/agendaModels';
@ApiTags('agendas')
@Controller('agendas')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Post()
  @ApiBody({ type: AgendaDTO, description: 'Criar uma nova pauta' })
  async create(@Body() userData: AgendaDTO) {
    return await this.agendaService.create(userData);
  }

  @Get('/byCategory/:categoryId')
  @ApiParam({
    name: 'categoryId',
    required: true,
    type: String,
    description: 'ID da categoria',
  })
  async findByCategory(@Param('categoryId') categoryId: string) {
    return await this.agendaService.findByCategory(categoryId);
  }

  @Get(':status')
  @ApiParam({
    name: 'status',
    required: true,
    type: String,
    description: 'Status da pauta',
  })
  async findAll(@Param('status') status: string) {
    return await this.agendaService.findAll(status);
  }

  @Get('/byOne/:id')
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'ID da pauta',
  })
  async findOne(@Param('id') id: string) {
    return await this.agendaService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: AgendaDTO, description: 'Editar uma nova agenda' })
  async update(@Param('id') id: string, @Body() agendaData: AgendaDTO) {
    return await this.agendaService.update(id, agendaData);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'ID da pauta',
  })
  async delete(@Param('id') id: string) {
    return await this.agendaService.delete(id);
  }
}
