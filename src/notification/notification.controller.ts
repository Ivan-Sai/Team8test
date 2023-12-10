import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateSystemNotificationDto } from './dto/create-system-notification.dto';
import { CreateTeamInvNotificationDto } from './dto/create-team-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('/system')
  async createSysNotification(
    @Body() createSystemNotificationDto: CreateSystemNotificationDto,
  ) {
    return await this.notificationService.createSystemNotification(
      createSystemNotificationDto,
    );
  }

  @Post('/team_inv')
  createTeamInvitationNotification(
    @Body() createTeam_inv_notificationDto: CreateTeamInvNotificationDto,
  ) {
    return this.notificationService.createTeamInvNotification(
      createTeam_inv_notificationDto,
    );
  }

  @Get(':id')
  async findNotificationById(@Param('id') id: number) {
    return await this.notificationService.findById(id);
  }
  @Get('user/:userid')
  async findNotificationByFromUser(@Param('userid') userid: number) {
    return await this.notificationService.findByFromUser(userid);
  }

  @Patch(':id')
  async readUnreadNotification(@Param('id') id: number) {
    await this.notificationService.readNotification(id);
  }

  @Delete(':id')
  async deleteNotification(@Param('id') id: number) {
    await this.notificationService.deleteNotification(id);
  }
}
