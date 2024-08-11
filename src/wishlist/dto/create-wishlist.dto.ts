import { IsString, Length, Max, IsNumber } from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @Max(1500)
  description?: string;

  @IsString()
  image: string;

  @IsNumber()
  itemsId: number[];
}
