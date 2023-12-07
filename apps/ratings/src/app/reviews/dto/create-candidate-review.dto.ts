import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export default class CreateCandidateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  rating: number;

  @IsOptional()
  @MaxLength(500)
  comment: string;
}
