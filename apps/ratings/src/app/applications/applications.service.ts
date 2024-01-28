import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from 'shared/config/app.config';
import CustomHeaders from 'shared/interfaces/custom-headers.iface';
import Application from './interfaces/application.iface';
import { PinoLogger } from 'nestjs-pino';
import ApplicationState from './interfaces/application-state.enum';

@Injectable()
export class ApplicationsService {
  private readonly applicationServiceUrl: string;

  constructor(
    private readonly logger: PinoLogger,
    readonly config: ConfigService,
  ) {
    this.applicationServiceUrl = config.getOrThrow<string>(
      ConfigEnum.APPLICATION_SERVICE_URL,
    );
  }

  async getApplication(
    id: string,
    headers: CustomHeaders,
  ): Promise<Application> {
    const url = `${this.applicationServiceUrl}/applications/${id}`;

    const response = await fetch(url, {
      headers: {
        'X-User-Id': headers.userId,
        'X-User-Roles': headers.userRoles.join(','),
      },
    });

    switch (response.status) {
      case 200:
        return response.json();
      case 404:
        return null;
      default:
        throw new Error(
          `Unexpected response from application service: ${response.status}`,
        );
    }
  }

  async updateApplicationState(
    id: string,
    headers: CustomHeaders,
    state: ApplicationState,
  ): Promise<Application> {
    const url = `${this.applicationServiceUrl}/applications/${id}/state`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'X-User-Id': headers.userId,
        'X-User-Roles': headers.userRoles.join(','),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        state,
      }),
    });

    switch (response.status) {
      case 200:
        return response.json();
      case 404:
        return null;
      default:
        throw new Error(
          `Unexpected response from application service: ${JSON.stringify(
            await response.json(),
          )}`,
        );
    }
  }
}
