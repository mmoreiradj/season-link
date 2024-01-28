import { Injectable } from '@nestjs/common';
import { PrismaService } from 'shared/prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.company.findMany();
  }

  findOne(id: string) {
    return this.prisma.company.findUniqueOrThrow({
      where: { id },
    });
  }
}
