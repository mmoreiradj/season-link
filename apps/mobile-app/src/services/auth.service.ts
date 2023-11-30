import config from 'config/config';
import httpClient from './http-client.service';
import { getTokens, storeTokens } from 'src/utils/tokens';
import Auth from 'src/models/auth';

export type RefreshAccessTokenResponse = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
};

export type DecodedToken = {
  exp: number;
  iat: number;
  sub: string;
  resource_access: {
    backend: {
      roles: string[];
    };
  };
};

const AuthService = {
  /**
   * Get a new access token using the refresh token.
   *
   * @param refreshToken
   * @returns RefreshAccessTokenResponse
   */
  refreshAccessToken: async (
    refreshToken: string
  ): Promise<RefreshAccessTokenResponse> => {
    const url = `${config.kc.baseUrl}/realms/${config.kc.realm}/protocol/openid-connect/token`;
    const response = await httpClient.post<RefreshAccessTokenResponse>(
      url,
      {
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
        client_id: config.kc.clientId,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data;
  },
  /**
   * Decode a JWT token.
   *
   * @param token base64 encoded JWT
   * @returns
   */
  decodeToken: (token: string): DecodedToken => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const decodedToken = JSON.parse(window.atob(base64));

    return decodedToken;
  },
  /**
   * Gets tokens from storage and sets them in the store.
   *
   * If the refresh token is expired, the user will have to log in again.
   * The access token will be refreshed automatically.
   *
   * Returns null if the user is not logged in. (No tokens in storage)
   * Returns Auth object with access and refresh token filled if the user is logged in.
   * Returns Auth object with all null fields if the refresh token is expired.
   *
   * @returns Auth | null
   */
  loadSession: async (): Promise<Auth | null> => {
    const { accessToken, refreshToken } = await getTokens();

    if (!accessToken || !refreshToken) return null;

    const decodedToken = AuthService.decodeToken(refreshToken);

    if (decodedToken.exp < Date.now() / 1000) {
      return null;
    } else {
      const data = await AuthService.refreshAccessToken(refreshToken);

      await storeTokens(data.accessToken, data.refreshToken);

      return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
    }
  },
};

export default AuthService;
