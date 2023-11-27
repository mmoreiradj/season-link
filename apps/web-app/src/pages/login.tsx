import { AuthSessionFunction } from 'hooks/auth/useAthorizationWorkflow';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

type Props = {
  promptAsync: AuthSessionFunction | null;
};

const LoginPage = ({ promptAsync }: Props) => {
  return (
    <View>
      <Text>Login page</Text>
      <Button disabled={!promptAsync} onPress={() => promptAsync?.()}>
        Login
      </Button>
    </View>
  );
};

export default LoginPage;
