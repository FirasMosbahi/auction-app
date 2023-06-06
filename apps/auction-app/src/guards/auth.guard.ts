import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisMessagesExchange } from '@app/common/redis/redis-messages-exchange';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly redisMessageExchange: RedisMessagesExchange) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const user = await this.redisMessageExchange.sendRequestMessage(
          'verify-authentification',
          token,
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
