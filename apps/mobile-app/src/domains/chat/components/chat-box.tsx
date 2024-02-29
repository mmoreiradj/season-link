import { Application } from 'domains/job-offers/types/applications.type';
import { FlatList, StyleSheet, View } from 'react-native';
import { it } from 'react-native-paper-dates';
import { useGetChatMessagesQuery } from '../store/chat.api';
import { ChatBubble } from './chat-bubble';
import { ChatMessage, MessageType } from '../types/message';
import { useCallback, useState } from 'react';
import AuthService from 'domains/auth/services/auth.service';
import { EmptyState } from 'common/components/empty-state';
import { LoadingState } from 'common/components/loading-state';

type Props = {
  application: Application;
};

export default function ChatBox({ application }: Props) {
  const {
    data: messages,
    isLoading: isMessagesLoading,
    error: messagesError,
  } = useGetChatMessagesQuery(application.id, {
    pollingInterval: 5000,
  });

  const [userId, setUserId] = useState<string | null>();
  AuthService.getDecodedToken().then((token) => {
    setUserId(token?.sub);
  });

  const renderItem = useCallback(
    ({ item }: { item: ChatMessage }) => {
      return (
        <ChatBubble isMine={item.authorId == userId} message={item.content} />
      );
    },
    [userId]
  );

  if (isMessagesLoading) {
    return (
      <View style={style.container}>
        <LoadingState title='Loading messages' />
      </View>
    );
  }

  return (
    userId && (
      <FlatList
        data={messages ?? []}
        renderItem={renderItem}
        style={style.container}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        inverted={true}
      />
    )
  );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
    //alignItems: 'stretch',
  },
});
