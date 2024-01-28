import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-ratings.dto';
import { Roles } from 'shared/decorator/roles.decorator';
import { Role } from 'shared/interfaces/roles.enum';
import { CompanyRatingsService } from './company-ratings.service';

@Controller('companies/:companyId/ratings')
export class CompanyRatingsController {
  constructor(private readonly companyRatingsService: CompanyRatingsService) {}

  @Post()
  @Roles(Role.Company)
  async create(
    @Body() createCandidateRatingDto: CreateRatingDto,
    @Param('companyId') companyId: string,
  ) {
    // TODO: before a candidate can rate a company, we need to check if the candidate has an application with the company
    return this.companyRatingsService.create(
      companyId,
      createCandidateRatingDto,
    );
  }

  @Get()
  async findAll(@Param('companyId') companyId: string) {
    return this.companyRatingsService.findAllRatingsByCandidateId(companyId);
  }
}
