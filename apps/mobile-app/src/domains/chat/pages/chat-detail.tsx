import { useGetApplicationQuery } from 'domains/job-offers/store/applications.api';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Appbar, Divider, Text } from 'react-native-paper';
import { useNavigate, useParams } from 'react-router-native';
import ChatHeader from '../components/chat-header';
import ChatBox from '../components/chat-box';
import { ChatForm } from '../components/chat-form';
import { useCreateChatMessageMutation } from '../store/chat.api';
import { toAvatarIcon } from '../components/application-item';
import { ApplicationState } from 'domains/job-offers/types/applications.type';

const ChatDetailPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { applicationId } = useParams();
  const {
    data: application,
    isLoading: isApplicationLoading,
    error,
  } = useGetApplicationQuery(applicationId!);

  const [postMessage, { isLoading: isPostingMessage }] =
    useCreateChatMessageMutation();

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <>
      <View style={{ width: '100%' }}>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              navigate('/');
            }}
          />
          <Appbar.Content title={t('chat:title')} />
        </Appbar.Header>
        <Divider />
      </View>

      {application && (
        <>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingHorizontal: 10,
            }}
          >
            {toAvatarIcon(application.state, 40)}
            <ChatHeader application={application} />
          </View>

          <ChatBox application={application} />
          <KeyboardAvoidingView
            style={{
              width: '100%',
              padding: 10,
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ChatForm
              onSubmit={(text) => {
                postMessage({ applicationId: application.id, content: text });
              }}
              disabled={application.state !== ApplicationState.PENDING}
            />
          </KeyboardAvoidingView>
        </>
      )}
    </>
  );
};

export default ChatDetailPage;
