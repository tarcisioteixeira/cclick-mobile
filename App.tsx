import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { NativeBaseProvider, StatusBar , ToastProvider} from 'native-base';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Loading } from './src/components/Loading';
import { AuthProvider } from './src/context/auth';
import { Routes } from './src/routes';
import { THEME } from './src/styles/theme';

export default function App() {

  const client = new QueryClient()

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (

    <NativeBaseProvider theme={THEME}>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <StatusBar
            barStyle='dark-content'
            backgroundColor='transparent'
            translucent />
          {
            fontsLoaded ? (
              <Routes />
            ) : <Loading />
          }
        </AuthProvider>
      </QueryClientProvider>
    </NativeBaseProvider>

  );
}


