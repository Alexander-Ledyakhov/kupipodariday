import { IsString, Max, IsNumber, Length } from 'class-validator';

export class UpdateWishlistDto {
  @IsString()
  @Length(1, 250)
  name?: string;

  @Max(1500)
  description?: string;

  @IsString()
  image?: string;

  @IsNumber()
  itemsId?: number[];
}
