import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RedisMessagesExchange } from '@app/common/redis/redis-messages-exchange';

//A guard that verify if the request sender is the owner of the item
@Injectable()
export class ItemOwnerGuard implements CanActivate {
  constructor(private readonly redisMessageExchange: RedisMessagesExchange) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const itemId = request.params.id;
    return await this.redisMessageExchange.sendRequestMessage('is-item-owner', {
      user,
      itemId,
    });
  }
}
