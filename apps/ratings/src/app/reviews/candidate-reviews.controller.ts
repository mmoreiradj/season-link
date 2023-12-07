import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CandidateReviewsService } from './candidate-reviews.service';
import { CandidatesService } from 'app/candidates/candidates.service';
import CreateCandidateRatingDto from './dto/create-candidate-review.dto';

@Controller('candidates/{candidate_id}/reviews')
export class CandidateReviewsController {
  constructor(
    private readonly companyReviews: CandidateReviewsService,
    private readonly candidateService: CandidatesService,
  ) {}

  @Post()
  async createRating(
    @Param('candidate_id') candidateId: string,
    @Body() createCandidateRatingDto: CreateCandidateRatingDto,
  ) {
    if (!(await this.candidateService.candidateExists(candidateId))) {
      throw new Error(`Candidate ${candidateId} does not exist`);
    }

    return this.companyReviews.create(candidateId, createCandidateRatingDto);
  }

  @Get('rating')
  async getMeanRating(@Param('candidate_id') candidateId: string) {
    if (!(await this.candidateService.candidateExists(candidateId))) {
      throw new Error(`Candidate ${candidateId} does not exist`);
    }

    return this.companyReviews.fetchMeanRating(candidateId);
  }

  @Get()
  async getReviews(@Param('candidate_id') candidateId: string) {
    if (!(await this.candidateService.candidateExists(candidateId))) {
      throw new Error(`Candidate ${candidateId} does not exist`);
    }

    return this.companyReviews.fetchReviews(candidateId);
  }
}
