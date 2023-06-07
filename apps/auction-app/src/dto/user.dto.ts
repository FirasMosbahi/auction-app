import { Max, Min } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UserDto {
  @ApiProperty({ description: 'The name of the user.' })
  username: string;
  @ApiProperty({ description: 'The password of the user.' })
  password: string;
}
