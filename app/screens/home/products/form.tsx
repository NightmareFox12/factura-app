import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { productsData } from '@/dataTest/productsData';
import { IProductsData } from '@/types/product.entity';
import {
  Button,
  Snackbar,
  Text,
  TextInput,
  Switch,
  HelperText,
} from 'react-native-paper';

export default function ProductForm() {
  // states
  const [form, setForm] = useState<IProductsData>({
    id: productsData.length,
    name: '',
    price: '',
    stock: '',
    IVA: false,
  });

  const [loadingCreation, setLoadingCreation] = useState<boolean>(false);
  const [showSnack, setShowSnack] = useState<boolean>(false);

  // functions
  const handleCreateProduct = async () => {
    try {
      setLoadingCreation(true);
      productsData.push({
        id: productsData.length + 1,
        name: form.name,
        price: form.price,
        stock: parseInt(form.stock.toString()),
        IVA: form.IVA,
      });

      setForm({
        id: productsData.length,
        name: '',
        price: '',
        stock: '',
        IVA: false,
      });
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
            <Text variant='headlineSmall' style={styles.header}>
              📦 Datos del Producto
            </Text>

            <Text style={styles.label}>📝 Nombre del Producto:</Text>
            <TextInput
              value={form.name}
              mode='outlined'
              placeholder='Nombre del producto'
              onChangeText={(x) => setForm((prev) => ({ ...prev, name: x }))}
            />

            <Text style={styles.label}>💰 Precio:</Text>
            <TextInput
              value={form.price}
              mode='outlined'
              keyboardType='numeric'
              placeholder='Precio'
              onChangeText={(x) =>
                (/^\d+(\.\d*)?$/.test(x) || x === '') &&
                setForm((prev) => ({ ...prev, price: x }))
              }
              right={
                <TextInput.Affix text='$' textStyle={{ fontWeight: 'bold' }} />
              }
              error={!/^\d+(\.\d+)?$/.test(form.price) && form.price.length > 0}
            />
            <HelperText
              type='error'
              visible={
                !/^\d+(\.\d+)?$/.test(form.price) && form.price.length > 0
              }
            >
              Precio invalido.
            </HelperText>

            <Text style={styles.label}>📦 Stock disponible:</Text>
            <TextInput
              value={form.stock.toString()}
              mode='outlined'
              keyboardType='numeric'
              placeholder='Stock disponible'
              onChangeText={(x) =>
                (/^\d+$/.test(x) || x === '') &&
                setForm((prev) => ({ ...prev, stock: x }))
              }
            />

            <View style={styles.switchContainer}>
              <Text style={styles.label}>⚖️ ¿Producto con IVA?</Text>
              <Switch
                value={form.IVA}
                onValueChange={(x) =>
                  setForm((prev) => ({ ...prev, IVA: !form.IVA }))
                }
              />
            </View>

            <Button
              style={styles.buttonSend}
              mode='contained'
              onPress={handleCreateProduct}
              icon={'cart'}
              loading={loadingCreation}
              contentStyle={{ flexDirection: 'row-reverse' }}
              disabled={
                form.name.length < 1 ||
                !/^\d+(\.\d+)?$/.test(form.price) ||
                !/^\d+(\.\d+)?$/.test(form.stock.toString()) ||
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
  container: { flex: 1 },
  containerScroll: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  header: {
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  label: { marginTop: 20, marginBottom: 5, fontWeight: 'bold', color: '#333' },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  buttonSend: { marginTop: 30 },
});
