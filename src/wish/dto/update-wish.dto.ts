import { IsString, Length, IsUrl, IsNumber } from 'class-validator';

export class UpdateWishDto {
  @IsString()
  @Length(1, 250)
  name?: string;

  @IsUrl()
  link?: string;

  @IsUrl()
  image?: string;

  @IsNumber()
  price?: number;

  @IsNumber()
  raised?: number;

  @IsString()
  @Length(1, 1024)
  description?: string;
}
