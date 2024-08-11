import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entity/users.entity';
import { Wish } from './entity/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
  ) {}

  async create(user: User, createWishDto: CreateWishDto) {
    return await this.wishesRepository.save({
      ...createWishDto,
      owner: user,
    });
  }

  async findOne(id: number) {
    const wish = await this.wishesRepository.findOneBy({ id });
    if (!wish) {
      throw new NotFoundException('Пожелание не найдено');
    }
    return wish;
  }

  async updateOne(user: User, id: number, updateWishDto: UpdateWishDto) {
    const wish = await this.wishesRepository.findOneBy({ id });
    if (!wish) {
      throw new NotFoundException('Пожелание не найдено');
    }
    if (wish.owner.id !== user.id) {
      throw new ForbiddenException('Изменять чужое пожелание запрещено');
    }
    if (wish.offers.length > 0) {
      throw new BadRequestException(
        'Изменение пожелания недоступно, Сбор средств уже начат',
      );
    }
    return this.wishesRepository.save({ ...updateWishDto, id });
  }

  async removeOne(user: User, id: number) {
    const wish = await this.wishesRepository.findOneBy({ id });
    if (!wish) {
      throw new NotFoundException('Пожелание не найдено');
    }
    if (wish.owner.id !== user.id) {
      throw new ForbiddenException('Удалять чужое пожелание запрещено');
    }
    return this.wishesRepository.delete(id);
  }

  async findAll() {
    const wishes = await this.wishesRepository.find();
    if (wishes.length === 0) {
      throw new NotFoundException('Пожелание не найдено');
    }
    return wishes;
  }

  async copy(id: number, user: User) {
    const wish = await this.wishesRepository.findOneBy({ id });
    if (!wish) {
      throw new NotFoundException('Пожелание не найдено');
    }
    return this.create(user, {
      ...wish,
      raised: 0,
      owner: user.id,
      offers: [],
    });
  }
}
