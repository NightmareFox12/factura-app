import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { MyLightTheme, MyDarkTheme } from '@/constants/MyTheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PaperProvider
        theme={colorScheme === 'dark' ? MyDarkTheme : MyLightTheme}
      >
        <Stack initialRouteName='main'>
          <Stack.Screen
            name='main'
            options={{ headerShown: false, animation: 'fade' }}
          />

          <Stack.Screen
            name='screens/register/companyDocument'
            options={{
              headerShown: false,
              animation: 'fade',
            }}
          />

          <Stack.Screen
            name='screens/register/companyInfo'
            options={{
              headerShown: false,
              animation: 'fade',
            }}
          />

          <Stack.Screen
            name='screens/login'
            options={{
              headerShown: false,
              animation: 'fade',
            }}
          />

          <Stack.Screen name='screens/home' options={{ headerShown: false }} />

          <Stack.Screen name='+not-found' />
        </Stack>
        <StatusBar style='auto' />
      </PaperProvider>
    </ThemeProvider>
  );
}
