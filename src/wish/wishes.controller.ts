import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from '../guard/jwt.guard';
import { User } from '../user/entity/users.entity';

@UseGuards(JwtGuard)
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post('')
  async create(@Req() req: User, @Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(req, createWishDto);
  }

  @Get('last')
  async findLast() {
    const array = await this.wishesService.findAll();
    return array.slice(-10);
  }

  @Get('top')
  async findTop() {
    const array = await this.wishesService.findAll();
    return array.slice(0, 11);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.wishesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Req() req: User,
    @Param('id') id: number,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    return this.wishesService.updateOne(req, id, updateWishDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async removeOne(@Req() req: User, @Param('id') id: number) {
    return this.wishesService.removeOne(req, id);
  }

  @UseGuards(JwtGuard)
  @Post(':wishId/copy')
  async copyWish(@Param('wishId') wishId: number, @Req() req: User) {
    return this.wishesService.copy(wishId, req);
  }
}
