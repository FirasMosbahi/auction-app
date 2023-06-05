import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  async registerUser(@Body() userDto: UserDto) {
    return await this.authService.registerUser(userDto);
  }
  @Post('/authentificate')
  async authentificateUser(@Body() userDto: UserDto) {
    return await this.authService.authentificateUser(userDto);
  }
}
