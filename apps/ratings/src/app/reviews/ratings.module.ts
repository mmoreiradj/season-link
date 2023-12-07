import { Module } from '@nestjs/common';
import { CompanyReviewsService } from './company-reviews.service';
import { CompaniesModule } from 'app/companies/companies.module';
import { CandidatesService } from 'app/candidates/candidates.service';
import { CompaniesService } from 'app/companies/companies.service';
import { CandidateReviewsService } from './candidate-reviews.service';
import { CandidateReviewsController } from './candidate-reviews.controller';
import { CompanyReviewsController } from './company-reviews.controller';
import { CandidatesModule } from 'app/candidates/candidates.module';

@Module({
  imports: [CompaniesModule, CandidatesModule],
  controllers: [CandidateReviewsController, CompanyReviewsController],
  providers: [
    CompanyReviewsService,
    CandidateReviewsService,
    CandidatesService,
    CompaniesService,
  ],
})
export class ReviewsModule {}
