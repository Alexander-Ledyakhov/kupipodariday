import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalGuard } from '../guard/local.guard';
import { AuthService } from './auth.service';
import { User } from '../user/entity/users.entity';
import { UsersService } from '../user/users.service';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  signIn(@Req() req: User) {
    return this.authService.auth(req);
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = this.usersService.create(createUserDto);
    return this.authService.auth(await user);
  }
}
