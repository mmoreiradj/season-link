import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CompanyReviewsService } from './company-reviews.service';
import { CompaniesService } from 'app/companies/companies.service';
import CreateCompanyReviewDto from './dto/create-company-review.dto';

@Controller('companies/{company_id}/reviews')
export class CompanyReviewsController {
  constructor(
    private readonly companyReviews: CompanyReviewsService,
    private readonly companyService: CompaniesService,
  ) {}

  @Post()
  async createRating(
    @Param('company_id') companyId: string,
    @Body() createCandidateRatingDto: CreateCompanyReviewDto,
  ) {
    if (!(await this.companyService.companyExists(companyId))) {
      throw new BadRequestException(`Company ${companyId} does not exist`);
    }

    return this.companyReviews.create(companyId, createCandidateRatingDto);
  }

  @Get()
  async getReviews(@Param('company_id') companyId: string) {
    if (!(await this.companyService.companyExists(companyId))) {
      throw new NotFoundException(`Company ${companyId} does not exist`);
    }

    return this.companyReviews.fetchReviews(companyId);
  }

  @Get('rating')
  async getRating(@Param('company_id') companyId: string) {
    if (!(await this.companyService.companyExists(companyId))) {
      throw new NotFoundException(`Company ${companyId} does not exist`);
    }

    return this.companyReviews.fetchMeanRatingForCompany(companyId);
  }
}
