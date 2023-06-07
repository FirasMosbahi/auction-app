import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RedisMessagesExchange } from '@app/common/redis/redis-messages-exchange';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@app/common/database/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly redisMessageExchange: RedisMessagesExchange,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(userDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    return await this.userRepository.create({
      username: userDto.username,
      password: hashedPassword,
    });
  }
  async authentificateUser(userDto) {
    const user = await this.userRepository.findOne({
      username: userDto.username,
    });
    if (user) {
      const match: boolean = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (match) {
        const payload = { id: user._id };
        const accessToken = this.jwtService.sign(payload);
        return { token: accessToken };
      } else {
        throw new UnauthorizedException('Wrong credentials');
      }
    } else {
      throw new NotFoundException('No user name with those credentials');
    }
  }
  async manageProfile(id: string, updateUserDto) {
    return await this.userRepository.findOneAndUpdate(
      { _id: id },
      updateUserDto,
    );
  }
  verifyAuthentification(token: string) {
    try {
      console.log(this.jwtService.verify(token));
      return this.jwtService.verify(token).id;
    } catch (error) {}
    return null;
  }
}
