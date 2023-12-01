import { UseQueryResult, useQuery } from 'react-query';
import AuthService, {
  RefreshAccessTokenResponse,
} from 'domains/auth/services/auth.service';
import { emptyTokens, storeTokens } from 'common/utils/tokens';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'common/store/store';
import { setAuth } from 'common/store/auth/authSlice';

export default function useTokenRefresher(): UseQueryResult<
  RefreshAccessTokenResponse | undefined,
  unknown
> {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  /**
   * Refresh the access token every 4 minutes.
   */
  return useQuery(
    'refresh',
    async () => {
      if (!auth.refreshToken) return;

      console.log('Refreshing access token...', {
        refreshToken: auth.refreshToken.substring(0, 10) + '...',
      });

      const refreshedAuth = await AuthService.refreshAccessToken(
        auth.refreshToken
      );

      return refreshedAuth;
    },
    {
      enabled: !!auth.refreshToken,
      retry: false,
      refetchInterval: 4 * 60 * 1000,
      onSuccess: async (refreshedAuth) => {
        if (!refreshedAuth) return;

        dispatch(
          setAuth({
            ...auth,
            accessToken: refreshedAuth.accessToken,
            refreshToken: refreshedAuth.refreshToken,
          })
        );

        await storeTokens(
          refreshedAuth.accessToken,
          refreshedAuth.refreshToken
        );
      },
      onError: async (error) => {
        console.error(error);
        dispatch(
          setAuth({
            ...auth,
            accessToken: null,
            refreshToken: null,
          })
        );

        await emptyTokens();
      },
    }
  );
}
