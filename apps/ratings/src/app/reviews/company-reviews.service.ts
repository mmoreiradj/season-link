import { PrismaService } from 'shared/prisma/prisma.service';
import CreateCompanyReviewDto from './dto/create-company-review.dto';

export class CompanyReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  create(companyId: string, createCandidateRatingDto: CreateCompanyReviewDto) {
    return this.prisma.companyReview.create({
      data: {
        ...createCandidateRatingDto,
        companyId: companyId,
      },
    });
  }

  fetchReviews(companyId: string) {
    return this.prisma.companyReview.findMany({
      where: {
        companyId,
      },
    });
  }

  fetchMeanRatingForCompany(companyId: string) {
    return this.prisma.companyReview.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        companyId,
      },
    });
  }
}
