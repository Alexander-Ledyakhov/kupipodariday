import { IsNotEmpty, IsString, Length, IsUrl, IsNumber } from 'class-validator';

export class CreateWishDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  name: string;

  @IsNotEmpty()
  @IsUrl()
  link: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 1024)
  description: string;

  @IsNumber()
  raised?: number;

  @IsNumber()
  owner?: number;

  offers?: [];
}
