import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { INotificationTypeData } from './NotificationTypes';
import { NotificationTypesEnum } from '../Enums/notificationTypesEnum';

@Entity({ name: 'notification' })
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.notifications)
  receiver: UserEntity;

  @Column({ type: 'bool', default: false })
  read: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'enum', enum: NotificationTypesEnum })
  type: NotificationTypesEnum;

  @Column({ type: 'jsonb' })
  data: INotificationTypeData;
}
