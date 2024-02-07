import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { PrismaService } from 'shared/prisma/prisma.service';

@Injectable()
export class RatingsService {
  constructor(private readonly prisma: PrismaService) {}

  create(
    companyId: string,
    candidateId: string,
    createRatingDto: CreateRatingDto,
  ) {
    return this.prisma.companyRating.create({
      data: {
        ...createRatingDto,
        companyId: companyId,
        candidateId: candidateId,
      },
    });
  }

  findAllByCompanyId(companyId: string) {
    return this.prisma.companyRating.findMany({
      where: { companyId },
    });
  }

  findOne(id: string) {
    return this.prisma.companyRating.findUniqueOrThrow({
      where: { id },
    });
  }

  getStats(companyId: string) {
    return this.prisma.companyRating.aggregate({
      where: { companyId },
      _avg: { rating: true },
      _count: true,
    });
  }
}
