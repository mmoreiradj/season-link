import { HelloWorld } from 'components/HelloWorld';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { Route, Routes, useNavigate } from 'react-router-native';
import ChatPage from 'src/pages/chat';
import EmailSentPage from 'src/pages/email-sent';
import EmailValidatedPage from 'src/pages/email-validated';
import HistoryPage from 'src/pages/history';
import LoginPage from 'src/pages/login';
import ProfileDeletePage from 'src/pages/profile-delete';
import OnboardingPage from 'src/pages/profile-onboarding';
import ScorePage from 'src/pages/profile-score';
import SettingsPage from 'src/pages/profile-settings';
import SignUpPage from 'src/pages/sign-up';
import useAuthorizationWorkflow from 'hooks/auth/useAthorizationWorkflow';
import useTokenRefresher from 'hooks/auth/useTokenRefresher';
import { useEffect, useState } from 'react';
import AuthService from 'services/auth.service';
import { emptyTokens } from './utils/tokens';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/store';
import { emptyAuth, setAuth } from 'store/auth/authSlice';
import JobPage from 'domains/jobs/pages/job';

export default function App() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  // handles the authorization workflow
  const { promptAsync } = useAuthorizationWorkflow();

  // Refreshes the access token every 4 minutes.
  useTokenRefresher();

  useEffect(() => {
    async function loadAuth() {
      try {
        const auth = await AuthService.loadSession();
        if (auth?.accessToken && auth?.refreshToken) {
          console.log('Found auth', {
            accessToken: auth.accessToken.substring(0, 10) + '...',
            refreshToken: auth.refreshToken.substring(0, 10) + '...',
          });
          dispatch(setAuth(auth));
        } else {
          console.log('No auth found');
        }
      } catch (error) {
        console.error(error);
        dispatch(emptyAuth());
        await emptyTokens();
      }
    }

    loadAuth().then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!auth.accessToken && !auth.refreshToken && !isLoading) {
      console.log('No auth found, redirecting to login');
      navigate('/login', {
        state: {
          from: '/',
        },
      });
    }
  }, [auth.accessToken, auth.refreshToken, isLoading]);

  return (
    <>
      <View style={styles.container}>
        <StatusBar style='auto' />
        {isLoading && <Text>Loading...</Text>}
        {!isLoading && (
          <Routes>
            <Route path='/' Component={HelloWorld} />
            <Route
              path='/login'
              element={<LoginPage promptAsync={promptAsync} />}
            />
            <Route path='/sign-up' Component={SignUpPage} />
            <Route path='/email-sent' Component={EmailSentPage} />
            <Route path='/email-validated' Component={EmailValidatedPage} />
            <Route path='/delete-account' Component={ProfileDeletePage} />
            <Route path='/onboarding' Component={OnboardingPage} />
            <Route path='/settings' Component={SettingsPage} />
            <Route path='/score' Component={ScorePage} />
            <Route path='/history' Component={HistoryPage} />
            <Route path='/jobs' Component={JobPage} />
            <Route path='/chat' Component={ChatPage} />
          </Routes>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
