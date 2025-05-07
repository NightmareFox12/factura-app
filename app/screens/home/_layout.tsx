import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function HomeLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Drawer initialRouteName='index'>
      <Drawer.Screen
        name="index" 
        options={{
          drawerLabel: 'Inicio',
          title: 'Inicio',
        }}
      />
      {/* <Drawer.Screen
        name="user/[id]" 
        options={{
          drawerLabel: 'User',
          title: 'overview',
        }}
      /> */}
    </Drawer>
  </GestureHandlerRootView>
    // <Stack screenOptions={{ headerShown: false }}>
    //   <Stack.Screen name='home' options={{ headerShown: false }} />
    // </Stack>
  );
}
