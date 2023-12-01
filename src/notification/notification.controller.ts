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
import { CreateSystemNotificationDto } from './dto/create-systemnotification.dto';
import { CreateTeamInvNotificationDto } from './dto/create-team_inv_notification.dto';
import { NotificationFacade } from './notification.facade';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly notificationFacade: NotificationFacade,
  ) {}

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
    return await this.notificationFacade.findById(id);
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
