import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  HttpCode,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/users.entity';
import { JwtGuard } from '../guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async findOwn(@Req() req: User) {
    return this.usersService.findOne(req.id);
  }

  @Patch('me')
  async update(@Req() req: User, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOne(req.id, updateUserDto);
  }

  @Get('me/wishes')
  async getOwnWishes(@Req() req: User) {
    const user = await this.usersService.findOne(req.id);
    return user.wishes;
  }

  @Get(':username')
  async findOneUserName(@Param('username') username: string) {
    return this.usersService.findOneUserName(username);
  }

  @Get(':username/wishes')
  async getUserNameWishes(@Param('username') username: string) {
    const user = await this.usersService.findOneUserName(username);
    return user.wishes;
  }

  @Post('find')
  @HttpCode(200)
  findMany(@Body() body: { query: string }) {
    return this.usersService.findMany(body.query);
  }
}
