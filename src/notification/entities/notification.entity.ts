import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { NotificationTypeData } from '../types/NotificationTypes';
import { NotificationTypesEnum } from '../Enums/notificationTypesEnum';
import { Transform } from 'class-transformer';

@Entity({ name: 'notification' })
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.notifications)
  receiver: UserEntity;

  @Column({ type: Boolean, default: false })
  read: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'enum', enum: NotificationTypesEnum })
  type: NotificationTypesEnum;

  @Column({ type: 'jsonb' })
  @Transform(({ value }) => {
    if (value && value.fromUser && value.fromUser.password) {
      delete value.fromUser.password;
    }
    return value;
  })
  data: NotificationTypeData;
}
