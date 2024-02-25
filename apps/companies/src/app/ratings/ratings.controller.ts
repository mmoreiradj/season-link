import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import UserData from 'shared/decorator/header.decorator';
import { Roles } from 'shared/decorator/roles.decorator';
import { Role } from 'shared/interfaces/role.enum';
import { ApplicationsService } from 'app/applications/applications.service';
import CustomHeaders from 'shared/interfaces/custom-headers.iface';
import { CompaniesService } from 'app/companies/companies.service';

@Controller('companies/:companyId/ratings')
export class RatingsController {
  constructor(
    private readonly ratingsService: RatingsService,
    private readonly applicationService: ApplicationsService,
    private readonly company: CompaniesService,
  ) {}

  /**
   * Create a rating for a company
   * - check if the user is a candidate
   * - check if the user applied to one of the company's jobs
   *
   * @param createRatingDto
   * @param companyId
   * @returns
   */
  @Post()
  @Roles(Role.Candidate)
  async create(
    @Body() createRatingDto: CreateRatingDto,
    @Param('companyId') companyId: string,
    @UserData() userData: CustomHeaders,
  ) {
    await this.company.findOne(companyId);

    const canRate = await this.applicationService.userAppliedToCompany(
      companyId,
      userData.userId,
    );

    if (!canRate) {
      throw new ForbiddenException();
    }

    return this.ratingsService.create(companyId, userData.userId, createRatingDto);
  }

  @Get()
  findAll(@Param('companyId') companyId: string) {
    return this.ratingsService.findAllByCompanyId(companyId);
  }

  @Get('stats')
  async getStats(@Param('companyId') companyId: string) {
    const stats = await this.ratingsService.getStats(companyId);
    return {
      count: stats._count,
      avg: stats._avg.rating,
    };
  }

  @Get(':id')
  async findOne(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
  ) {
    const rating = await this.ratingsService.findOne(id);

    if (rating.companyId !== companyId) {
      throw new NotFoundException();
    }

    return rating;
  }
}
