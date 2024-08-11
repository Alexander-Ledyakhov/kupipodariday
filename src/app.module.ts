import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './wishlist/entity/wishlist.entity';
import { Wish } from './wish/entity/wish.entity';
import { Offer } from './offer/entity/offers.entity';
import { User } from './entity/User';
import { WishlistsModule } from './wishlist/wishlist.module';
import { WishesModule } from './wish/wishes.module';
import { UsersModule } from './user/users.module';
import { OffersModule } from './offer/offers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'student',
      password: 'student',
      database: 'postgres',
      entities: [User, Offer, Wish, Wishlist],
      synchronize: true,
    }),
    AuthModule,
    OffersModule,
    UsersModule,
    WishesModule,
    WishlistsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
