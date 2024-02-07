import { Injectable } from '@nestjs/common';
import { PrismaService } from 'shared/prisma/prisma.service';

@Injectable()
export class RecruitersService {
  constructor(private readonly prisma: PrismaService) {}

  findAllByCompanyId(companyId: string) {
    return this.prisma.recruiter.findMany({
      where: { companyId },
    });
  }

  findOne(id: string) {
    return this.prisma.recruiter.findUniqueOrThrow({
      where: { id },
    });
  }
}
