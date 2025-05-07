import { useEffect } from 'react';
import { BackHandler, StyleSheet, View, Image, ScrollView } from 'react-native';
import { Text, Button, FAB, Appbar, Card } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <ScrollView style={styles.content}>
        </ScrollView>

        <FAB 
          icon="plus"
          label="Nueva Factura"
          style={styles.fab}
          onPress={() => console.log('Crear nueva factura')}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  content: { flex: 1, padding: 20 },
  card: { marginBottom: 15, padding: 0 },
  fab: { position: 'absolute', right: 20, bottom: 20 },
});
