import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { ApplicationsService } from 'app/applications/applications.service';
import { ApplicationsModule } from 'app/applications/applications.module';
import { CompaniesModule } from 'app/companies/companies.module';
import { CompaniesService } from 'app/companies/companies.service';

@Module({
  imports: [ApplicationsModule, CompaniesModule],
  controllers: [RatingsController],
  providers: [RatingsService, ApplicationsService, CompaniesService],
})
export class RatingsModule {}
