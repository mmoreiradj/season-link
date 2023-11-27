import { registerRootComponent } from 'expo';
import { PaperProvider } from 'react-native-paper';
import { decode, encode } from 'base-64';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from 'src/App';
import { NativeRouter } from 'react-router-native';
import { store } from 'store/store';
import { Provider } from 'react-redux';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

function Index() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Provider store={store}>
        <PaperProvider>
          <NativeRouter>
            <App />
          </NativeRouter>
        </PaperProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default registerRootComponent(Index);
