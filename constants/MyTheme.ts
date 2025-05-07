import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export const MyDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    // primary: '#BADA55',
  },
};

export const MyLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#BADA55',
  },
};
