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
import { UserModelDTO } from './models/userModel';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: UserModelDTO, description: 'Criar um novo usuário' })
  async create(@Body() userData: UserModelDTO) {
    return await this.userService.create(userData);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'ID do usuário',
  })
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: UserModelDTO, description: 'Editar um novo usuário' })
  async update(@Param('id') id: string, @Body() userData: UserModelDTO) {
    return await this.userService.update(id, userData);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'ID do usuário',
  })
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
