import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entity/users.entity';
import { Wish } from '../wish/entity/wish.entity';
import { Wishlist } from './entity/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistsRepository: Repository<Wishlist>,
  ) {}

  async create(user: User, CreateWishlistDto: CreateWishlistDto) {
    const { name, image, itemsId } = CreateWishlistDto;
    const wishes = itemsId.map((id) => ({ id }) as Wish);
    if (wishes.length === 0) {
      throw new NotFoundException('Пожелания не найдены');
    }
    const wishlist = this.wishlistsRepository.create({
      name,
      description: '',
      image,
      owner: user,
      items: wishes,
    });
    return this.wishlistsRepository.save({
      ...CreateWishlistDto,
      wishlist,
    });
  }

  async findOne(id: number) {
    const wishlist = await this.wishlistsRepository.findOneBy({ id });
    if (!wishlist) {
      throw new NotFoundException('Список не найден');
    }
    return wishlist;
  }

  async updateOne(
    user: User,
    id: number,
    UpdateWishlistDto: UpdateWishlistDto,
  ) {
    const wishlist = await this.wishlistsRepository.findOneBy({ id });
    if (!wishlist) {
      throw new NotFoundException('Список не найден');
    }
    if (wishlist.owner.id !== user.id) {
      throw new ForbiddenException('Изменять чужой список запрещено');
    }
    return this.wishlistsRepository.save({ ...UpdateWishlistDto, id });
  }

  async removeOne(user: User, id: number) {
    const wishlist = await this.wishlistsRepository.findOneBy({ id });
    if (!wishlist) {
      throw new NotFoundException('Список не найден');
    }
    if (wishlist.owner.id !== user.id) {
      throw new ForbiddenException('Удалять чужой список запрещено');
    }
    return this.wishlistsRepository.delete(id);
  }

  async findAll() {
    const wishlist = await this.wishlistsRepository.find();
    if (!wishlist) {
      throw new NotFoundException('Список не найден');
    }
    return wishlist;
  }
}
