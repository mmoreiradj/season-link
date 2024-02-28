import { View } from 'react-native';
import { Icon, Text } from 'react-native-paper';

export type EmptyStateProps = {
  title: string;
};

export const EmptyState = (props: EmptyStateProps) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '80%',
      }}
    >
      <Icon source='border-none-variant' color='grey' size={150} />
      <View>
        <Text
          variant='headlineMedium'
          style={{ fontStyle: 'italic', color: 'grey', marginBottom: 10 }}
        >
          It's quite empty here...
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
