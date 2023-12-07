import { PrismaService } from 'shared/prisma/prisma.service';
import CreateCandidateReviewDto from './dto/create-candidate-review.dto';

export class CandidateReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  create(
    candidateId: string,
    createCandidateRatingDto: CreateCandidateReviewDto,
  ) {
    return this.prisma.candidateReview.create({
      data: {
        ...createCandidateRatingDto,
        candidateId,
      },
    });
  }

  fetchReviews(candidateId: string) {
    return this.prisma.candidateReview.findMany({
      where: {
        candidateId,
      },
    });
  }

  fetchMeanRating(candidateId: string) {
    return this.prisma.candidateReview.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        candidateId,
      },
    });
  }
}
