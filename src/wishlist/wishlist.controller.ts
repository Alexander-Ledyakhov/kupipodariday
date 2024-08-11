import {
  UseGuards,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import { WishlistsService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { User } from '../user/entity/users.entity';
import { JwtGuard } from '../guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('wishlistlists')
export class WishlistsController {
  constructor(private wishlistsService: WishlistsService) {}

  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }

  @Post()
  create(@Req() req: User, @Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistsService.create(req, createWishlistDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wishlistsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Req() req: User,
    @Param('id') id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return this.wishlistsService.updateOne(req, id, updateWishlistDto);
  }

  @Delete(':id')
  removeOne(@Req() req: User, @Param('id') id: number) {
    return this.wishlistsService.removeOne(req, id);
  }
}
