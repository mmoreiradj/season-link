import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from 'shared/config/app.config';
import fetch from 'node-fetch';

@Injectable()
export class CandidatesService {
  private readonly candidateServiceUrl: string;

  constructor(private readonly config: ConfigService) {
    this.candidateServiceUrl = config.getOrThrow<string>(
      ConfigEnum.CANDIDATES_SERVICE_URL,
    );
  }

  /**
   * Returns false if the candidate does not exist, true otherwise.
   * Note that this function will only throw an error if the candidate service is not reachable or returns an unexpected status code.
   *
   * @param id id of the candidate
   * @returns true if the candidate exists, false otherwise
   */
  async candidateExists(id: string): Promise<boolean> {
    const response = await fetch(`${this.candidateServiceUrl}/profiles/${id}`);

    switch (response.status) {
      case 200:
        return true;
      case 404:
        return false;
      default:
        throw new Error(
          `Unexpected response from candidate service: ${response.status}`,
        );
    }
  }
}
