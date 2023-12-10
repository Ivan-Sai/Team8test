import { UserEntity } from '../../user/entities/user.entity';
import {
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SystemNotificationData {
  @IsString()
  @IsOptional()
  system_message: string;
}

export class TeamInvitationNotificationData {
  @IsObject()
  @ValidateNested()
  @Type(() => UserEntity)
  fromUser: UserEntity;
  @IsString()
  @IsOptional()
  message?: string | null;
}

export type NotificationTypeData =
  | SystemNotificationData
  | TeamInvitationNotificationData;
