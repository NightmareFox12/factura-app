import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function HomeLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer initialRouteName='index'>
        <Drawer.Screen
          name='index'
          options={{
            drawerLabel: 'Inicio',
            title: 'Inicio',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name='products/index'
          options={{
            drawerLabel: 'Productos',
            title: 'Productos',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
