import { IsNotEmpty, IsString } from 'class-validator';

class SystemNotificationDto {
  @IsString()
  system_message: string;
}

class TeamInvNotificationDto {
  @ApiProperty({ example: 'nmashchenko' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsOptional()
  @Validate(IsNotExist, ['User'], {
    message: 'usernameAlreadyExists',
  })
  from_user: string;
  message?: string;
}

export class CreateNotificationDto {
  receiver: string;
  type: string;
  data: SystemNotificationDto | TeamInvNotificationDto;
}
