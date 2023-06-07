import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

//Controller which listen for the messages coming from main app auth controller
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @MessagePattern('register-user')
  async handleUserRegistration(@Payload() userDto) {
    return await this.authService.registerUser(userDto);
  }
  @MessagePattern('authentificate-user')
  async handleUserAuthentification(@Payload() userDto) {
    return await this.authService.authentificateUser(userDto);
  }
  @MessagePattern('update-user')
  async handleUpdateUser(@Payload() data) {
    return await this.authService.manageProfile(data.id, data.credentials);
  }
  @MessagePattern('verify-authentification')
  handleVerifyAuthentification(@Payload() token) {
    return this.authService.verifyAuthentification(token);
  }
}
