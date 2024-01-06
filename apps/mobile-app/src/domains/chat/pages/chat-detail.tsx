import { useGetApplicationQuery } from 'domains/job-offers/store/applications.api';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useParams } from 'react-router-native';
import ChatHeader from '../components/chat-header';
import ChatBox from '../components/chat-box';

const ChatDetailPage = () => {
  const { applicationId } = useParams();
  const { t } = useTranslation();
  const {
    data: application,
    isLoading: isApplicationLoading,
    error,
  } = useGetApplicationQuery(applicationId!);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <View style={style.container}>
      <View>
        <Text variant='displayMedium'>{t('chat:title')}</Text>
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {!isApplicationLoading && application ? (
          <>
            <ChatHeader application={application} />
            <ChatBox application={application} />
          </>
        ) : (
          <View>
            <Text>{t('chat:loadingMessage')}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

export default ChatDetailPage;
