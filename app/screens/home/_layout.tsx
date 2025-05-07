import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Icon } from 'react-native-paper';

export default function HomeLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer initialRouteName='index'>
        <Drawer.Screen
          name='index'
          options={{
            drawerLabel: 'Inicio',
            title: 'Inicio',
            drawerIcon: (props) => (
              <Icon source={'home'} size={props.size} color={props.color} />
            ),
          }}
        />

        <Drawer.Screen
          name='products/index'
          options={{
            drawerLabel: 'Productos',
            title: 'Productos',
            drawerIcon: (props) => (
              <Icon
                source={'package-variant'}
                size={props.size}
                color={props.color}
              />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
