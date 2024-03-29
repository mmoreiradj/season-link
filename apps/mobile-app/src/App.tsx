import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { Route, Routes, useNavigate } from 'react-router-native';
import EmailSentPage from 'domains/profile/pages/email-sent';
import EmailValidatedPage from 'domains/profile/pages/email-validated';

import LoginPage from 'src/pages/login';
import ProfileDeletePage from 'domains/profile/pages/profile-delete';
import OnboardingPage from 'domains/profile/pages/profile-onboarding';
import ScorePage from 'domains/profile/pages/profile-score';
import SignUpPage from 'src/pages/sign-up';
import { useEffect, useState } from 'react';
import { emptyTokens } from 'common/utils/tokens';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'common/store/store';
import { emptyAuth, setAuth } from 'common/store/auth/authSlice';
import JobPage from 'domains/job-offers/pages/job';
import { Home } from 'common/components/home';
import useAuthorizationWorkflow from 'domains/auth/hooks/useAthorizationWorkflow';
import useTokenRefresher from 'domains/auth/hooks/useTokenRefresher';
import AuthService from 'domains/auth/services/auth.service';
import ChatDetailPage from 'domains/chat/pages/chat-detail';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsPage from 'domains/profile/pages/profile-settings';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ChatPage from 'domains/chat/pages/chats';
import HistoryPage from 'domains/profile/pages/profile-history';
import FlashMessage from 'react-native-flash-message';

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <StatusBar style='auto' />
          {isLoading && <Text>Loading...</Text>}
          {!isLoading && (
            <Routes>
              <Route path='/' Component={Home} />
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
              <Route path='/chat/:applicationId' Component={ChatDetailPage} />
              <Route path='/chat' Component={ChatPage} />
            </Routes>
          )}
        </SafeAreaView>
      </GestureHandlerRootView>

      {/* GLOBAL FLASH MESSAGE COMPONENT INSTANCE */}
      <FlashMessage position='top' />
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
