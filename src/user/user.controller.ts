import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id/notifications')
  async findAllNotifications(@Param('id') id: string) {
    return await this.userService.findAllNotifications(+id);
  }

  @Get(':id/notifications/system')
  async findSystemNotifications(@Param('id') id: string) {
    return await this.userService.findSystemNotifications(+id);
  }

  @Get(':id/notifications/team_inv')
  async findTeamInvNotifications(@Param('id') id: string) {
    return await this.userService.findTeamInvNotifications(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
