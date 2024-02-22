import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { spawn } from 'child_process';
import { PinoLogger } from 'nestjs-pino';
import { Config } from 'shared/config/app.config';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnApplicationShutdown {
  private databaseUrl: string;

  constructor(
    private readonly logger: PinoLogger,
    config: ConfigService<Config>,
  ) {
    const pgUser = config.getOrThrow('PG_USER');
    const pgPassword = config.getOrThrow('PG_PASSWORD');
    const pgHost = config.getOrThrow('PG_HOST');
    const pgPort = config.getOrThrow('PG_PORT');
    const databaseName = config.getOrThrow('PG_DATABASE');
    const url = `postgresql://${pgUser}:${pgPassword}@${pgHost}:${pgPort}/${databaseName}`;

    super({
      datasources: {
        db: {
          url,
        },
      },
    });

    this.databaseUrl = url;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onApplicationShutdown() {
    await this.$disconnect();
  }

  async migrate(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        this.logger.setContext(PrismaService.name);
        this.logger.info('Migrating database');

        const migrate = spawn('npm', ['run', 'migrate:up'], {
          env: {
            DATABASE_URL: this.databaseUrl,
            ...process.env,
          },
          stdio: 'pipe',
        });

        migrate.stdout.on('data', (data) => {
          if (data.toString() !== '\n') {
            this.logger.info(data.toString().trim());
          }
        });

        migrate.stderr.on('data', (data) => {
          if (data.toString() !== '\n') {
            this.logger.error(data.toString().trim());
          }
        });

        migrate.on('close', (code) => {
          if (code === 0) {
            resolve();
          } else {
            reject(new Error(`Migration failed with code ${code}`));
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
