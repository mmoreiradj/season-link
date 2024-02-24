import { useState } from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';

export type ChatFormProps = {
  disabled?: boolean;
  onSubmit: (message: string) => void;
};

export const ChatForm = (props: ChatFormProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message) {
      props.onSubmit(message);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder='Type a message'
        mode='outlined'
        disabled={props.disabled}
      />
      <IconButton
        size={40}
        onPress={handleSubmit}
        icon='send-circle'
        disabled={props.disabled}
      />
    </View>
  );
};

const styles: Record<string, StyleProp<ViewStyle>> = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
};
