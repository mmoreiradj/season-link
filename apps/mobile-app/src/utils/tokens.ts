import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

/**
 * Get the tokens from the AsyncStorage.
 */
export async function getTokens(): Promise<{
  accessToken: string | null;
  refreshToken: string | null;
}> {
  const { accessToken, refreshToken } = await Promise.all([
    AsyncStorage.getItem(ACCESS_TOKEN_KEY),
    AsyncStorage.getItem(REFRESH_TOKEN_KEY),
  ]).then((values) => {
    const accessToken = values[0];
    const refreshToken = values[1];
    return { accessToken, refreshToken };
  });

  return { accessToken, refreshToken };
}
/**
 * Store the tokens in AsyncStorage
 *
 * @param accessToken
 * @param refreshToken
 */
export function storeTokens(
  accessToken: string,
  refreshToken: string
): Promise<void> {
  return AsyncStorage.multiSet([
    [ACCESS_TOKEN_KEY, accessToken],
    [REFRESH_TOKEN_KEY, refreshToken],
  ]);
}

export function emptyTokens(): Promise<void> {
  return AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
}
