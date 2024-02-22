import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { Config, config } from 'shared/config/app.config';
import { HealthModule } from './health/health.module';
import { PrismaModule } from 'shared/prisma/prisma.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: config,
    }),
    LoggerModule.forRootAsync({
      useFactory: (config: ConfigService<Config>) => ({
        pinoHttp: {
          level: config.getOrThrow<string>('LOG_LEVEL'),
          transport:
            config.getOrThrow<string>('NODE_ENV') !== 'production'
              ? { target: 'pino-pretty' }
              : undefined,
          serializers: {
            req: (req) => ({
              method: req.method,
              url: req.url,
              // headers: req.headers,
            }),
            res: (res) => ({
              statusCode: res.statusCode,
            }),
            err: (err) => ({
              message: err.message,
              stack: err.stack,
            }),
          },
        },
      }),
      inject: [ConfigService],
    }),
    HealthModule,
    PrismaModule,
    ChatModule,
  ],
  controllers: [],
})
export class AppModule { }
