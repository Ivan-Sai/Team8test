import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSystemNotificationDto } from './dto/create-systemnotification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from './entities/notification.entity';
import { UserService } from '../user/user.service';
import { CreateTeamInvNotificationDto } from './dto/create-team_inv_notification.dto';
import { NotificationTypesEnum } from './Enums/notificationTypesEnum';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
    private readonly userService: UserService,
  ) {}
  public async createSystemNotification(
    createSystemNotificationDto: CreateSystemNotificationDto,
  ) {
    const notification = new NotificationEntity();
    const receiver = await this.userService.findOne(
      createSystemNotificationDto.receiverId,
    );
    if (receiver != null && receiver != undefined) {
      notification.receiver = receiver;
    } else throw new BadRequestException('Receiver not found');
    notification.type = NotificationTypesEnum.system;
    notification.data = {
      system_message: createSystemNotificationDto.system_message,
    };
    await this.notificationRepository.save(notification);
  }

  public async createTeamInvNotification(
    createTeam_inv_notificationDto: CreateTeamInvNotificationDto,
  ) {
    const notification = new NotificationEntity();
    const receiver = await this.userService.findOne(
      createTeam_inv_notificationDto.receiverId,
    );
    if (receiver != null && receiver != undefined) {
      notification.receiver = receiver;
    } else throw new BadRequestException('Receiver not found');

    const from_user = await this.userService.findOne(
      createTeam_inv_notificationDto.from_user,
    );
    if (from_user != null) {
      notification.type = NotificationTypesEnum.team_invitation;
      notification.data = {
        fromUser: await this.userService.findOne(
          createTeam_inv_notificationDto.from_user,
        ),
        message: createTeam_inv_notificationDto.message,
      };
      await this.notificationRepository.save(notification);
    } else throw new BadRequestException('From_user not found');
  }

  public async readNotification(id: number) {
    const notification = await this.findById(id);
    notification.read = !notification.read;
    await this.notificationRepository.save(notification);
  }

  public async deleteNotification(id: number) {
    const notification = await this.findById(id);
    await this.notificationRepository.remove(notification);
  }

  public async findNotificationById(id: number) {
    return await this.findById(id);
  }

  private async findById(id: number) {
    const notification = await this.notificationRepository.findOne({
      where: { id: id },
      relations: ['receiver'],
    });
    if (notification != null) return notification;
    else throw new BadRequestException('Notification not found');
  }
}
