import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(CreateUserDto: CreateUserDto) {
    const { email, password } = CreateUserDto;

    if (await this.usersRepository.findOneBy({ email })) {
      throw new ForbiddenException('Пользователь уже существует');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return this.usersRepository.save({
      ...CreateUserDto,
      password: hashedPassword,
    });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async updateOne(id: number, UpdateUserDto: UpdateUserDto) {
    const { username, email, password } = UpdateUserDto;
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    if (await this.usersRepository.findOneBy({ username })) {
      throw new ForbiddenException('Имя пользователя уже занято');
    }

    if (await this.usersRepository.findOneBy({ email })) {
      throw new ForbiddenException('Email пользователя уже занят');
    }

    return this.usersRepository.save({
      ...UpdateUserDto,
      id,
      password: hashedPassword,
    });
  }

  async removeOne(id: number, userId: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    if (user.id !== userId) {
      throw new ForbiddenException('Доступ к чужому пользователю запрещен');
    }

    return this.usersRepository.delete(id);
  }

  async findOneUserName(username: string) {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async findMany(query: string) {
    const users = await this.usersRepository.find({
      where: [{ username: query }, { email: query }],
    });

    return users;
  }
}
