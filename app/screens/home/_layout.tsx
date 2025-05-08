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

        <Drawer.Screen
          name='clients/index'
          options={{
            drawerLabel: 'Clientes',
            title: 'Clientes',
            drawerIcon: (props) => (
              <Icon
                source={'account-group'}
                size={props.size}
                color={props.color}
              />
            ),
          }}
        />

        <Drawer.Screen
          name='history/index'
          options={{
            drawerLabel: 'Historial',
            title: 'Historial',
            drawerIcon: (props) => (
              <Icon source={'history'} size={props.size} color={props.color} />
            ),
          }}
        />

        <Drawer.Screen
          name='clients/form'
          options={{
            drawerLabel: 'Crear Cliente',
            title: 'Crear Cliente',
            drawerIcon: (props) => (
              <Icon
                source={'account-plus'}
                size={props.size}
                color={props.color}
              />
            ),
          }}
        />

        <Drawer.Screen
          name='products/form'
          options={{
            drawerLabel: 'Crear Producto',
            title: 'Crear Producto',
            drawerIcon: (props) => (
              <Icon
                source={'plus-box'}
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
