import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, Snackbar, Text, TextInput, Switch } from 'react-native-paper';
import { productsData } from '@/test/productsData';

export default function ProductForm() {
  // Estados
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [stock, setStock] = useState<string>('');
  const [IVA, setIVA] = useState<boolean>(false);

  const [loadingCreation, setLoadingCreation] = useState<boolean>(false);
  const [showSnack, setShowSnack] = useState<boolean>(false);

  // Función para guardar el producto
  const handleCreateProduct = async () => {
    try {
      setLoadingCreation(true);
      productsData.push({
        id: productsData.length + 1,
        name,
        price,
        stock: parseInt(stock),
        IVA,
      });

      setName('');
      setPrice('');
      setStock('');
      setIVA(false);
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
          <View style={styles.containerScroll}>
            <Text variant="headlineSmall" style={styles.header}>📦 Datos del Producto</Text>

            <Text style={styles.label}>📝 Nombre del Producto:</Text>
            <TextInput value={name} mode="outlined" onChangeText={setName} />

            <Text style={styles.label}>💰 Precio:</Text>
            <TextInput
              value={price}
              mode="outlined"
              keyboardType="numeric"
              onChangeText={(x) => (/^\d+$/.test(x) || x === '') && setPrice(x)}
              right={<TextInput.Affix text="$" textStyle={{ fontWeight: 'bold' }} />}
            />

            <Text style={styles.label}>📦 Stock disponible:</Text>
            <TextInput
              value={stock}
              mode="outlined"
              keyboardType="numeric"
              onChangeText={(x) => (/^\d+$/.test(x) || x === '') && setStock(x)}
            />

            <View style={styles.switchContainer}>
              <Text style={styles.label}>⚖️ ¿Producto con IVA?</Text>
              <Switch value={IVA} onValueChange={setIVA} />
            </View>

            <Button
              style={styles.buttonSend}
              mode="contained"
              onPress={handleCreateProduct}
              icon={'cart'}
              loading={loadingCreation}
              contentStyle={{ flexDirection: 'row-reverse' }}
              disabled={name.length < 2 || price === '' || stock === '' || loadingCreation}
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
          ✅ ¡Producto guardado exitosamente!
        </Snackbar>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerScroll: { marginHorizontal: 16, padding: 16, backgroundColor: '#f8f8f8', borderRadius: 10 },
  header: { textAlign: 'center', marginVertical: 20, fontWeight: 'bold', fontSize: 22,},
  label: { marginTop: 20, marginBottom: 5, fontWeight: 'bold', color: '#333' },
  switchContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 },
  buttonSend: { marginTop: 30,},
});
