import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { productsData } from '@/test/productsData';


export default function ProductForm() {
  // states
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [stock, setStock] = useState<string>('');

  const [loadingCreation, setLoadingCreation] = useState<boolean>(false);
  const [showSnack, setShowSnack] = useState<boolean>(false);

  //functions
  const handleCreateProduct = async () => {
    try {
      setLoadingCreation(true);
      productsData.push({
        id: productsData.length + 1,
        name,
        price,
        stock: parseInt(stock),
      });

      setName('');
      setPrice('');
      setStock('');
      setShowSnack(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingCreation(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={[styles.container, styles.containerScroll]}>
            <Text
              variant='headlineSmall'
              style={{ textAlign: 'center', marginTop: 40 }}
            >
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
              onChangeText={(x) => {
                (/^\d+$/.test(x) || x === '') && setPrice(x);
              }}
              right={
                <TextInput.Affix text='$' textStyle={{ fontWeight: 'bold' }} />
              }
            />

            <TextInput
              label='Stock'
              value={stock}
              mode='outlined'
              keyboardType='numeric'
              onChangeText={(x) => {
                (/^\d+$/.test(x) || x === '') && setStock(x);
              }}
            />

            <Button
              style={styles.buttonSend}
              mode='contained'
              onPress={handleCreateProduct}
              icon={'arrow-right'}
              loading={loadingCreation}
              contentStyle={{ flexDirection: 'row-reverse' }}
              disabled={
                name.length < 2 ||
                price === '' ||
                stock === '' ||
                loadingCreation
              }
            >
              {loadingCreation ? 'Guardando...' : 'Guardar Producto'}
            </Button>
          </View>
        </ScrollView>
        <Snackbar
          visible={showSnack}
          onDismiss={() => setShowSnack(false)}
          duration={1500}
          action={{
            label: '',
            icon: 'close',
            onPress: () => setShowSnack(false),
          }}
        >
          ¡Producto guardado exitosamente!
        </Snackbar>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
