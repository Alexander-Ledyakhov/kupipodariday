import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entity/offers.entity';
import { Repository } from 'typeorm';
import { WishesService } from '../wish/wishes.service';
import { User } from '../user/entity/users.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
    private wishesService: WishesService,
  ) {}

  async create(user: User, CreateOfferDto: CreateOfferDto) {
    const wish = await this.wishesService.findOne(CreateOfferDto.itemId);
    if (wish.raised >= CreateOfferDto.amount) {
      throw new ForbiddenException('Сбор завершен');
    }
    return await this.offersRepository.save({
      ...CreateOfferDto,
      user: user,
    });
  }

  async findOne(id: number) {
    const offer = await this.offersRepository.findOneBy({ id });
    if (!offer) {
      throw new NotFoundException('Заявка не найдена');
    }
    return offer;
  }

  async findAll() {
    const offers = await this.offersRepository.find({
      relations: {
        user: true,
        item: true,
      },
    });
    return offers;
  }
}
