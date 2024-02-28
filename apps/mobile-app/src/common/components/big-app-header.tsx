import { Image, View } from 'react-native';
import { Text } from 'react-native-paper';

export const BigAppHeader = () => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Image
        source={require('assets/icon.png')}
        style={{ height: 50, width: 50, marginRight: 10 }}
        resizeMode='contain'
      />
      <Text variant='displayMedium'>Season Link</Text>
    </View>
  );
};
