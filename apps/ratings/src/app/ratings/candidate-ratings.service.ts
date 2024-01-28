import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-ratings.dto';
import { PrismaService } from 'shared/prisma/prisma.service';

@Injectable()
export class CandidateRatingsService {
  constructor(private readonly prisma: PrismaService) {}

  create(candidateId: string, createCandidateRatingDto: CreateRatingDto) {
    return this.prisma.candidateReview.create({
      data: {
        ...createCandidateRatingDto,
        candidateId,
      },
    });
  }

  findAllRatingsByCandidateId(candidateId: string) {
    return this.prisma.candidateReview.findMany({
      where: {
        candidateId,
      },
    });
  }
}
