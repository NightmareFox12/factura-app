import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export const MyDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    onSurfaceVariant: '#000',
    onSecondary: '#000'
  },
};

export const MyLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#BADA55',
  },
};


// primary: string;
// primaryContainer: string;
// secondary: string;
// secondaryContainer: string;
// tertiary: string;
// tertiaryContainer: string;
// surface: string;
// surfaceVariant: string;
// surfaceDisabled: string;
// background: string;
// error: string;
// errorContainer: string;
// onPrimary: string;
// onPrimaryContainer: string;
// onSecondary: string;
// onSecondaryContainer: string;
// onTertiary: string;
// onTertiaryContainer: string;
// onSurface: string;
// onSurfaceVariant: string;
// onSurfaceDisabled: string;
// onError: string;
// onErrorContainer: string;
// onBackground: string;
// outline: string;
// outlineVariant: string;
// inverseSurface: string;
// inverseOnSurface: string;
// inversePrimary: string;
// shadow: string;
// scrim: string;
// backdrop: string;