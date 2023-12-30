import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Post()
  async registerUser(
    @Body() userData: { name: string; email: string; phone: string },
  ) {
    return await this.usersService.registerUser(userData);
  }
}
