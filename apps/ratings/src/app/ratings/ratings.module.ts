import { Module } from '@nestjs/common';
import { CompanyRatingsController } from './company-ratings.controller';
import { CandidateRatingsService } from './candidate-ratings.service';
import { CandidateRatingsController } from './candidate-ratings.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'shared/guards/roles.guard';
import { ApplicationsModule } from 'app/applications/applications.module';
import { ApplicationsService } from 'app/applications/applications.service';

@Module({
  imports: [ApplicationsModule],
  controllers: [CompanyRatingsController, CandidateRatingsController],
  providers: [
    ApplicationsService,
    CandidateRatingsService,
    CandidateRatingsService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class RatingsModule {}
