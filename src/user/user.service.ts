import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationDto } from 'src/notification/dto/notification.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const user = new UserEntity();
    user.fullName = createUserDto.fullname;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    return this.userRepository.save(user);
  }

  async findOne(id: number) {
    if (id == undefined)
    return null

    return await this.userRepository.findOneBy({
      id: id,
    });
  }

  async findAllNotifications(id: number) {
    const user = await this.findUser(id)

    if (user != null) return user.notifications.map((notificaiton) => new NotificationDto(notificaiton));
    else throw new BadRequestException('User not found');
  }

  async findSystemNotifications(id: number) {
    const user = await this.findUser(id)
    if (user != null)
      return user.notifications.filter(
        (notification) => notification.type == 'system',
      ).map(notification => new NotificationDto(notification));
    else throw new BadRequestException('User not found');
  }

  async findTeamInvNotifications(id: number) {
    const user = await this.findUser(id)
    if (user != null)
      return user.notifications.filter(
        (notification) => notification.type == 'team_invitation',
      ).map(notification => new NotificationDto(notification));
    else throw new BadRequestException('User not found');
  }

  private async findUser(id: number) {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: ['notifications', 'notifications.receiver'],
    });
  }
}
