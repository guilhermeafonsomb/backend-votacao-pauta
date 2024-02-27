import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserModelDTO } from './models/userModel';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userData: UserModelDTO) {
    return await this.userService.create(userData);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.userService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userData: UserModelDTO) {
    return await this.userService.update(Number(id), userData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(Number(id));
  }
}
