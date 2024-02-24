import { Text } from 'react-native-paper';
import { MessageType } from '../types/message';

export type ChatBubbleProps = {
  message: string;
  type?: MessageType;
  isMine: boolean;
};

export const ChatBubble = (props: ChatBubbleProps) => {
  return (
    // TODO change stuff ?
    <Text
      style={{
        backgroundColor: props.isMine ? '#0f0' : '#f00',
        padding: 10,
        borderRadius: 10,
        alignSelf: props.isMine ? 'flex-end' : 'flex-start',
        maxWidth: '60%',
      }}
    >
      {props.message}
    </Text>
  );
};
