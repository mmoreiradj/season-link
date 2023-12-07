import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from 'shared/prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly prisma: PrismaService,
    private readonly prismaHealth: PrismaHealthIndicator,
  ) {}

  @Get('live')
  live() {
    return this.health.check([
      () => this.prismaHealth.pingCheck('prisma', this.prisma),
    ]);
  }

  @Get('ready')
  ready() {
    return this.health.check([
      () => this.prismaHealth.pingCheck('prisma', this.prisma),
    ]);
  }
}
