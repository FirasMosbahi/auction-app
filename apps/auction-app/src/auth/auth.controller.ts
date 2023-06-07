import {Body, Controller, Get, Param, Patch, Post, Req, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update.user.dto';
import {AuthGuard} from "../guards/auth.guard";

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
  @Patch('/manageProfile')
  @UseGuards(AuthGuard)
  async modifyProfile(@Req() req) {
    return await this.authService.manageProfile(req.user, req.body);
  }
}
