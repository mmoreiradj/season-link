import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  @IsNumber()
  @Max(10)
  rating: number;
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  comment: string;
}
