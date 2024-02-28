import { BigAppHeader } from 'common/components/big-app-header';
import { AuthSessionFunction } from 'domains/auth/hooks/useAthorizationWorkflow';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Link } from 'react-router-native';

type Props = {
  promptAsync: AuthSessionFunction | null;
};

const LoginPage = ({ promptAsync }: Props) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: 20,
      }}
    >
      <BigAppHeader />
      <View
        style={{
          padding: 20,
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          gap: 20,
          paddingBottom: '50%',
        }}
      >
        <Text
          variant='displaySmall'
          style={{
            textAlign: 'center',
          }}
        >
          Login
        </Text>
        <Button
          icon={require('assets/keycloak_logo.png')}
          disabled={!promptAsync}
          onPress={() => promptAsync?.()}
        >
          Login with Keycloak
        </Button>

        <Link to='/sign-up'>
          <Text
            variant='bodyLarge'
            style={{
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            Don't have an account? Sign up
          </Text>
        </Link>
      </View>
    </View>
  );
};

export default LoginPage;
