import { StyleSheet, View } from 'react-native';
import { BottomNavigation, Button, Text } from 'react-native-paper';
import { emptyTokens } from 'common/utils/tokens';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'common/store/store';
import { setAuth } from 'common/store/auth/authSlice';
import { useNavigate } from 'react-router-native';
import React from 'react';
import HistoryPage from 'src/pages/history';

import ScorePage from 'domains/profile/pages/profile-score';
import JobPage from 'domains/job-offers/pages/job';
import SettingsPage from 'domains/profile/pages/profile-settings';
import ChatPage from 'domains/chat/pages/chats';

export function Home() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'score',
      title: 'Score',
      focusedIcon: 'star',
      unfocusedIcon: 'star-outline',
    },
    {
      key: 'history',
      title: 'History',
      focusedIcon: 'book-account',
      unfocusedIcon: 'book-account-outline',
    },
    {
      key: 'jobs',
      title: 'Jobs Offers',
      focusedIcon: 'briefcase',
      unfocusedIcon: 'briefcase-outline',
    },
    {
      key: 'messages',
      title: 'Messages',
      focusedIcon: 'message',
      unfocusedIcon: 'message-outline',
    },
    {
      key: 'profile',
      title: 'Profile',
      focusedIcon: 'cog',
      unfocusedIcon: 'cog-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    score: ScorePage,
    history: HistoryPage,
    jobs: JobPage,
    messages: ChatPage,
    profile: SettingsPage,
  });

  return (
    <BottomNavigation
      shifting={true}
      style={{ width: '100%' }}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
