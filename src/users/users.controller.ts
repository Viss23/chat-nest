import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/loginDto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.usersService.login(dto);
  }
}
