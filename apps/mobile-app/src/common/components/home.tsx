import { StyleSheet, View } from 'react-native';
import { BottomNavigation, Button, Text } from 'react-native-paper';
import { emptyTokens } from 'common/utils/tokens';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'common/store/store';
import { setAuth } from 'common/store/auth/authSlice';
import { useNavigate } from 'react-router-native';
import React from 'react';

import ScorePage from 'domains/profile/pages/profile-score';
import JobPage from 'domains/job-offers/pages/job';
import SettingsPage from 'domains/profile/pages/profile-settings';
import ChatPage from 'domains/chat/pages/chats';
import HistoryPage from 'domains/profile/pages/profile-history';
import { useGetTotalRecruiterMessageCountQuery } from 'domains/chat/store/chat.api';
import FlashMessage, { showMessage } from 'react-native-flash-message';

export function Home() {
  // Since we're in the home page, we track the message count here via polling
  const [messageCount, setMessageCount] = React.useState<number | undefined>(
    undefined
  );

  const newMessageCount = useGetTotalRecruiterMessageCountQuery(undefined, {
    pollingInterval: 5000,
    selectFromResult: (result) => {
      // Remove all metadata from the result
      return { data: result.data };
    },
  });

  React.useEffect(() => {
    console.log('New message count', newMessageCount.data, messageCount);
    if ((newMessageCount.data ?? 0) > (messageCount ?? 0)) {
      //Show a notification
      if (messageCount !== undefined) {
        showMessage({
          message: 'New message',
          description: 'Check out the new message in the chat section',
          type: 'info',
          floating: true,
        });
      }

      setMessageCount(newMessageCount.data ?? 0);
    }
  }, [newMessageCount.data]);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
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
