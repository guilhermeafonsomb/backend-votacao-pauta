import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { AgendaDTO } from './models/agendaModels';

@Controller('agendas')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Post()
  async create(@Body() userData: AgendaDTO) {
    return await this.agendaService.create(userData);
  }

  @Get(':status')
  async findAll(@Param('status') status: string) {
    return await this.agendaService.findAll(status);
  }

  @Get('/byOne/:id')
  async findOne(@Param('id') id: string) {
    return await this.agendaService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() agendaData: AgendaDTO) {
    return await this.agendaService.update(Number(id), agendaData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.agendaService.delete(Number(id));
  }
}
