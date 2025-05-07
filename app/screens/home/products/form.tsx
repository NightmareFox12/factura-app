import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function ProductForm() {
  const router = useRouter();

  // Estados
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  return (
    <SafeAreaProvider>


      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={[styles.container, styles.containerScroll]}>
            <Text variant='headlineSmall' style={{ textAlign: 'center', marginTop: 40 }}>
              Datos del Producto
            </Text>

            <TextInput
              label='Nombre del Producto'
              value={name}
              mode='outlined'
              onChangeText={setName}
            />

            <TextInput
              label='Precio'
              value={price}
              mode='outlined'
              keyboardType='numeric'
              onChangeText={setPrice}
            />

            <TextInput
              label='Stock'
              value={stock}
              mode='outlined'
              keyboardType='numeric'
              onChangeText={setStock}
            />

            <Button
              style={styles.buttonSend}
              mode='contained'
              onPress={() => console.log('Producto guardado')}
              icon={'arrow-right'}
              contentStyle={{ flexDirection: 'row-reverse' }}
            >
              Guardar Producto
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  containerScroll: {
    marginHorizontal: 16,
  },
  buttonSend: {
    marginTop: 30,
    marginHorizontal: 20,
  },
});
