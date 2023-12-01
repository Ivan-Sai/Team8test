import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSystemNotificationDto } from './dto/create-systemnotification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from './entities/notification.entity';
import { UserService } from '../user/user.service';
import { CreateTeamInvNotificationDto } from './dto/create-team_inv_notification.dto';
import { NotificationTypesEnum } from './Enums/notificationTypesEnum';
import { NotificationService } from './notification.service';
import { NotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationFacade {
  constructor(private readonly notificationService: NotificationService) {}
  public async findById(id: number) {
    const notification: NotificationEntity =
      await this.notificationService.findNotificationById(id);
    return new NotificationDto(notification);
  }
}
