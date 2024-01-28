import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-ratings.dto';
import { PrismaService } from 'shared/prisma/prisma.service';

@Injectable()
export class CompanyRatingsService {
  constructor(private readonly prisma: PrismaService) {}

  create(companyId: string, createCandidateRatingDto: CreateRatingDto) {
    return this.prisma.companyReview.create({
      data: {
        ...createCandidateRatingDto,
        companyId,
      },
    });
  }

  findAllRatingsByCandidateId(companyId: string) {
    return this.prisma.companyReview.findMany({
      where: {
        companyId,
      },
    });
  }
}
