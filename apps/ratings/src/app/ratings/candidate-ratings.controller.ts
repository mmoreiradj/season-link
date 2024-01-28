import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CandidateRatingsService } from './candidate-ratings.service';
import { CreateRatingDto } from './dto/create-ratings.dto';
import { Roles } from 'shared/decorator/roles.decorator';
import { Role } from 'shared/interfaces/roles.enum';

@Controller('candidates/:candidateId/ratings')
export class CandidateRatingsController {
  constructor(
    private readonly candidateRatingsService: CandidateRatingsService,
  ) {}

  @Post()
  @Roles(Role.Company)
  async create(
    @Body() createCandidateRatingDto: CreateRatingDto,
    @Param('candidateId') candidateId: string,
  ) {
    // TODO: before a company can rate a candidate, we need to check if the company has an application with the candidate
    return this.candidateRatingsService.create(
      candidateId,
      createCandidateRatingDto,
    );
  }

  @Get()
  async findAll(@Param('candidateId') candidateId: string) {
    return this.candidateRatingsService.findAllRatingsByCandidateId(
      candidateId,
    );
  }
}
