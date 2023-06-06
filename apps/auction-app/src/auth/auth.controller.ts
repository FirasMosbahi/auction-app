import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update.user.dto';

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
  @Get('/logout/:id')
  async logoutUser(@Param('id') id: string) {
    return await this.authService.logout(id);
  }
  @Patch('/manageProfile/:id')
  async modifyProfile(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.authService.manageProfile(id, updateUserDto);
  }
}
