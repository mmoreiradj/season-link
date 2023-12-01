import config from 'config/config';
import {
  AuthRequest,
  AuthRequestPromptOptions,
  AuthSessionResult,
  exchangeCodeAsync,
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from 'expo-auth-session';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/store';
import { setAuth } from 'store/auth/authSlice';

enum AuthorizationState {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type AuthSessionFunction = (
  options?: AuthRequestPromptOptions
) => Promise<AuthSessionResult>;

type UseAuthorizationWorkflowResult = {
  state: AuthorizationState | null;
  request: AuthRequest | null;
  result: AuthSessionResult | null;
  promptAsync: AuthSessionFunction | null;
};

const emptyResult: UseAuthorizationWorkflowResult = {
  state: AuthorizationState.PENDING,
  request: null,
  result: null,
  promptAsync: null,
};

const kcUrl = `${config.kc.baseUrl}/realms/${config.kc.realm}`;

/**
 * Implements the authorization code flow. If the access token and refresh token are
 * already present in the store nothing happens. Otherwise, the authorization code is
 * exchanged for an access token.
 *
 * @see https://docs.expo.io/guides/authentication/#authorization-code-flow
 * @returns UseAuthorizationWorkflowResult
 */
export default function useAuthorizationWorkflow(): UseAuthorizationWorkflowResult {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [hookResult, setHookResult] =
    useState<UseAuthorizationWorkflowResult>(emptyResult);

  const discovery = useAutoDiscovery(kcUrl);

  const [request, result, promptAsync] = useAuthRequest(
    {
      clientId: config.kc.clientId,
      redirectUri: makeRedirectUri({
        scheme: 'myapp',
      }),
      scopes: ['profile', 'email'],
    },
    discovery
  );

  useEffect(() => {
    if (auth.accessToken && auth.refreshToken) {
      setHookResult({
        state: AuthorizationState.SUCCESS,
        request,
        result,
        promptAsync,
      });

      return;
    }

    setHookResult({
      state: AuthorizationState.PENDING,
      request,
      result,
      promptAsync,
    });
  }, [request, result, setHookResult, auth]);

  /**
   * Exchange the authorization code for an access token.
   */
  useEffect(() => {
    if (result?.type !== 'success') {
      setHookResult({
        state: AuthorizationState.ERROR,
        request,
        result,
        promptAsync,
      });

      return;
    }

    if (
      !request ||
      !discovery ||
      !request.codeVerifier ||
      hookResult.state === AuthorizationState.ERROR ||
      hookResult.state === AuthorizationState.SUCCESS
    )
      return;

    const { code } = result.params;
    const { codeVerifier } = request;

    console.log('Exchanging authorization code for access token...', {
      code: code.substring(0, 10) + '...',
      codeVerifier: codeVerifier.substring(0, 10) + '...',
    });
    exchangeCodeAsync(
      {
        clientId: config.kc.clientId,
        code,
        redirectUri: makeRedirectUri({
          scheme: 'myapp',
        }),
        extraParams: {
          code_verifier: codeVerifier,
        },
      },
      discovery
    )
      .then((response) => {
        dispatch(
          setAuth({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken as string,
          })
        );
        navigate('/');
        setHookResult({
          state: AuthorizationState.SUCCESS,
          request,
          result,
          promptAsync,
        });
      })
      .catch((error) => {
        console.error(error);
        setHookResult({
          state: AuthorizationState.ERROR,
          request,
          result,
          promptAsync,
        });
      });
  }, [result, discovery, config, setHookResult]);

  return hookResult;
}
