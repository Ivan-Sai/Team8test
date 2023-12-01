export interface ISystemNotificationData {
  system_message: string;
}

export interface DtoTeamInvitationNotificationData {
  fromUserId: number;
  message?: string | null;
}

export type DtoNotificationTypeData =
  | ISystemNotificationData
  | DtoTeamInvitationNotificationData;
