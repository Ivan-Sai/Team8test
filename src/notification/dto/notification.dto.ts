import { NotificationEntity } from '../entities/notification.entity';
import { DtoNotificationTypeData } from '../entities/DtoNotificationTypes';

export class NotificationDto {
  id: number;

  receiverId: number;

  read: boolean;

  createdAt: Date;

  type: string;

  data: DtoNotificationTypeData;

  constructor(notification: NotificationEntity) {
    this.id = notification.id;
    this.receiverId = notification.receiver.id;
    this.read = notification.read;
    this.createdAt = notification.createdAt;
    this.type = notification.type;
    if (this.type === 'team_invitation' && notification.data) {
      if ('fromUser' in notification.data) {
        this.data = {
          fromUserId: notification.data.fromUser.id,
          message: notification.data.message || null,
        };
      }
    }
    else {
      if ('system_message' in notification.data) {
        this.data = {
          system_message: notification.data.system_message
        }
      }
    }
  }
}
