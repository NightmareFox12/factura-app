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
          name='products/form'
          options={{
            drawerLabel: () => null,
            title: 'Crear Producto',
            drawerItemStyle: { display: 'none' },
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
          name='clients/form'
          options={{
            drawerLabel: () => null,
            title: 'Crear Cliente',
            drawerItemStyle: { display: 'none' },
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
          name='history/invoiceForm'
          options={{
            drawerLabel: () => null,
            title: 'Crear Factura',
            drawerItemStyle: { display: 'none' },
          }}
        />

        <Drawer.Screen
          name='testing/index'
          options={{
            drawerLabel: 'PDF para miguel (eliminar)',
            title: 'PDF para miguel (eliminar)',
            drawerIcon: (props) => (
              <Icon
                source={'file-pdf-box'}
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
