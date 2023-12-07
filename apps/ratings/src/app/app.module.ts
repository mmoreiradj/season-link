import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { ConfigEnum, config } from 'shared/config/app.config';
import { HealthModule } from './health/health.module';
import { PrismaModule } from 'shared/prisma/prisma.module';
import { CompaniesService } from './companies/companies.service';
import { ReviewsModule } from './reviews/ratings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: config,
    }),
    LoggerModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        pinoHttp: {
          level: config.getOrThrow<string>(ConfigEnum.LOG_LEVEL),
          transport:
            config.getOrThrow<string>(ConfigEnum.NODE_ENV) !== 'production'
              ? { target: 'pino-pretty' }
              : undefined,
        },
      }),
      inject: [ConfigService],
    }),
    HealthModule,
    PrismaModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [CompaniesService],
})
export class AppModule {}
