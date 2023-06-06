import { Injectable } from '@nestjs/common';
import { RedisMessagesExchange } from '@app/common/redis/redis-messages-exchange';
import { UserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update.user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly redisMessageExchange: RedisMessagesExchange) {}
  async registerUser(userDto: UserDto) {
    return await this.redisMessageExchange.sendRequestMessage(
      'register-user',
      userDto,
    );
  }
  async authentificateUser(userDto: UserDto) {
    return await this.redisMessageExchange.sendRequestMessage(
      'authentificate-user',
      userDto,
    );
  }
  async manageProfile(id: string, updateUserDto: UpdateUserDto) {
    return await this.redisMessageExchange.sendRequestMessage('update-user', {
      id,
      credentials: updateUserDto,
    });
  }
}
