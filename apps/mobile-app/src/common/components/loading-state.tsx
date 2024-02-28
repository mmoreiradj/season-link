import { View } from 'react-native';
import { ActivityIndicator, Icon, Text } from 'react-native-paper';

export type LoadingStateProps = {
  title: string;
};

export const LoadingState = (props: LoadingStateProps) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '80%',
      }}
    >
      <ActivityIndicator size='large' />
      <View>
        <Text
          variant='headlineMedium'
          style={{ fontStyle: 'italic', color: 'grey', marginBottom: 10 }}
        >
          Hard at work...
        </Text>
        <Text
          style={{ fontStyle: 'italic', color: 'black', textAlign: 'center' }}
        >
          {props.title}
        </Text>
      </View>
    </View>
  );
};
