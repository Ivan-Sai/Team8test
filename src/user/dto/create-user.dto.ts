import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fullname: string | null;

  @IsEmail()
  email: string | null;

  @IsNotEmpty()
  password: string;
}
