import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from 'shared/config/app.config';

@Injectable()
export class CompaniesService {
  private readonly companyServiceUrl: string;

  constructor(private readonly config: ConfigService) {
    this.companyServiceUrl = config.getOrThrow<string>(
      ConfigEnum.COMPANIES_SERVICE_URL,
    );
  }

  /**
   * Returns false if the company does not exist, true otherwise.
   * Note that this function will only throw an error if the company service is not reachable or returns an unexpected status code.
   *
   * @param id id of the company
   * @returns true if the company exists, false otherwise
   */
  async companyExists(id: string): Promise<boolean> {
    const response = await fetch(`${this.companyServiceUrl}/companies/${id}`);

    switch (response.status) {
      case 200:
        return true;
      case 404:
        return false;
      default:
        throw new Error(
          `Unexpected response from company service: ${response.status}`,
        );
    }
  }
}
