import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { emptyTokens } from 'src/utils/tokens';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/store';
import { setAuth } from 'store/auth/authSlice';
import { useNavigate } from 'react-router-native';

export function HelloWorld() {
  const user = useSelector((state: RootState) => state.user);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <View>
      <Text variant='displayLarge'>Hello World!</Text>
      <Text>
        Have you considered calling yourself "{user.fisrt_name} {user.last_name}
        "?
      </Text>
      <Text>
        You are currently {auth.accessToken ? 'logged in' : 'logged out'}.
      </Text>
      <Button
        disabled={!auth.accessToken}
        onPress={() => {
          dispatch(
            setAuth({
              accessToken: null,
              refreshToken: null,
            })
          );
          emptyTokens();
        }}
      >
        Logout
      </Button>
      <Button onPress={() => navigate('/jobs')}>Go to jobs</Button>
    </View>
  );
}
