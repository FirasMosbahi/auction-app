import { Injectable } from '@nestjs/common';
import { RedisMessagesExchange } from '@app/common/redis/redis-messages-exchange';
import { UserDto } from '../dto/user.dto';

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
}
