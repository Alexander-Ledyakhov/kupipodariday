import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { User } from '../user/entity/users.entity';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { JwtGuard } from '../guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(user: User, @Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(user, createOfferDto);
  }

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.offersService.findOne(id);
  }
}
