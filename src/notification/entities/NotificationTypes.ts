import { UserEntity } from '../../user/entities/user.entity';

export interface ISystemNotificationData {
  system_message: string;
}

export interface ITeamInvitationNotificationData {
  fromUser: UserEntity;
  message?: string | null;
}

export type INotificationTypeData =
  | ISystemNotificationData
  | ITeamInvitationNotificationData;
