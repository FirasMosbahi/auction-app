import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RedisMessagesExchange } from '@app/common/redis/redis-messages-exchange';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly redisMessageExchange: RedisMessagesExchange) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (authHeader) {
      try {
        const user = await this.redisMessageExchange.sendRequestMessage(
          'verify-authentification',
          authHeader,
        );
        if (user) {
          request.user = user;
          return true;
        }
      } catch (error) {}
    }
    return false;
  }
}
