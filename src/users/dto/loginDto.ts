import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsString()
  username: string;

  @IsString()
  password: string;
}
