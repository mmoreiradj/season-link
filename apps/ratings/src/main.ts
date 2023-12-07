import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app/app.module';
import { Logger } from 'nestjs-pino';
import { ConfigEnum } from 'shared/config/app.config';
import { PrismaCLientKnownRequestErrorFilter } from 'shared/filters/prisma-client-known-request-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get<Logger>(Logger));

  const logger = app.get<Logger>(Logger);
  const config = app.get<ConfigService>(ConfigService);

  app.enableShutdownHooks();
  app.useGlobalFilters(
    new PrismaCLientKnownRequestErrorFilter(app.get<Logger>(Logger)),
  );

  const host = config.getOrThrow(ConfigEnum.SERVER_HOST);
  const port = config.getOrThrow(ConfigEnum.SERVER_PORT);

  logger.log(`Starting server on ${host}:${port}`, 'bootstrap');

  await app.listen(port, host);
}
bootstrap();
