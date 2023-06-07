import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../dto/user.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/update.user.dto';
@ApiTags('authentification')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  @ApiBody({ type: UserDto })
  @ApiOperation({ summary: 'create a new user' })
  @ApiResponse({ status: 201, description: 'The created user credentials.' })
  async registerUser(@Body() userDto: UserDto) {
    return await this.authService.registerUser(userDto);
  }
  @Post('/authentificate')
  @ApiBody({ type: UserDto })
  @ApiOperation({ summary: 'authentificate a user' })
  @ApiResponse({
    status: 201,
    description: 'The authentificated user jwt token.',
  })
  async authentificateUser(@Body() userDto: UserDto) {
    return await this.authService.authentificateUser(userDto);
  }
  @Patch('/manageProfile')
  @UseGuards(AuthGuard)
  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({
    summary:
      'modify a user profile it requires the user token in the header authorization',
  })
  @ApiResponse({ status: 200, description: 'The user new credentials.' })
  async modifyProfile(@Req() req) {
    return await this.authService.manageProfile(req.user, req.body);
  }
}
