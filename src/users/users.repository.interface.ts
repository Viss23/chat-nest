import { LoginDto } from './dto/loginDto';

export interface IUsersRepository {
  login(dto: LoginDto): Promise<any>;
  getAllUsers(): Promise<any>;
  updateUserOnlineStatus(userId: string, isOnline: boolean): Promise<any>;
  updateUserOnlineStatusDelay(userId: string, isOnline: boolean): Promise<any>;
}
