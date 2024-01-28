import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app/app.module';
import { spawn } from 'child_process';
import { Logger } from 'nestjs-pino';
import { ConfigEnum } from 'shared/config/app.config';
import { PrismaCLientKnownRequestErrorFilter as PrismaClientKnownRequestErrorFilter } from 'shared/filters/prisma-client-known-request-error.filter';

async function migrate(): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    const migrate = spawn('npm', ['run', 'migrate:up']);
    const output = [];
    migrate.stdout.on('data', (data) => {
      if (data.toString() !== '\n')
        output.push(data.toString().trim().split('\n').join(' '));
    });
    migrate.stderr.on('data', (data) => {
      if (data.toString() !== '\n') output.push(data.toString().trim());
    });
    migrate.on('close', (code) => {
      if (code === 0) {
        resolve(output);
      }

      reject(output);
    });
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get<Logger>(Logger));

  const logger = app.get<Logger>(Logger);
  const config = app.get<ConfigService>(ConfigService);

  app.enableShutdownHooks();
  app.useGlobalFilters(
    new PrismaClientKnownRequestErrorFilter(app.get<Logger>(Logger)),
  );
  app.useGlobalPipes(new ValidationPipe());

  const host = config.getOrThrow(ConfigEnum.SERVER_HOST);
  const port = config.getOrThrow(ConfigEnum.SERVER_PORT);

  logger.log(`Migrating database`, 'bootstrap');

  try {
    const data = await migrate();
    for (const line of data) {
      logger.log(line, 'bootstrap');
    }
  } catch (error) {
    logger.error(error, 'bootstrap');
    process.exit(1);
  }

  logger.log(`Starting server on ${host}:${port}`, 'bootstrap');

  await app.listen(port, host);
}
bootstrap();
