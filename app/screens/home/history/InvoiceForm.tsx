import React, { useState, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  Snackbar,
  Text,
  TextInput,
  HelperText,
  IconButton,
  Card,
  List,
  useTheme,
} from 'react-native-paper';
// import RNPickerSelect from 'react-native-picker-select';
import { productsData } from '@/dataTest/productsData';
import { clientsData } from '@/dataTest/clientsData';
import { invoicesData } from '@/dataTest/invoiceData';
import ModalSearchClient from '@/components/modalSearchClient';
import ModalSearchProduct from '@/components/modalSearchProduct';

export default function InvoiceForm() {
  const theme = useTheme();

  // states
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const [date, setDate] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [invoiceItems, setInvoiceItems] = useState<
    { product: string; quantity: number }[]
  >([]);
  const [showSnack, setShowSnack] = useState<boolean>(false);
  const [showModalClient, setShowModalClient] = useState<boolean>(false);
  const [showModalProduct, setShowModalProduct] = useState<boolean>(false);

  //memos
  const client = useMemo(() => {
    if (selectedClient === null) return;
    return clientsData.find((x) => x.id === selectedClient);
  }, [selectedClient]);

  const product = useMemo(() => {
    if (selectedProduct === null) return;
    return productsData.find((x) => x.id === selectedProduct);
  }, [selectedProduct]);

  // Cálculo de montos totales
  const totalAmount = useMemo(() => {
    return invoiceItems
      .reduce((total, item) => {
        const product = productsData.find((p) => p.name === item.product);
        return (
          total +
          (product ? parseFloat(product.price.toString()) * item.quantity : 0)
        );
      }, 0)
      .toFixed(2);
  }, [invoiceItems]);

  const totalWithIVA = useMemo(() => {
    return invoiceItems
      .reduce((total, item) => {
        const product = productsData.find((p) => p.name === item.product);
        const productPrice = product
          ? parseFloat(product.price.toString()) * item.quantity
          : 0;
        const ivaAmount = product?.IVA ? productPrice * 0.16 : 0;
        return total + productPrice + ivaAmount;
      }, 0)
      .toFixed(2);
  }, [invoiceItems]);

  // Agregar producto
  // const handleAddProduct = () => {
  //   if (selectedProduct && parseInt(quantity) > 0) {
  //     setInvoiceItems([
  //       ...invoiceItems,
  //       { product: selectedProduct, quantity: parseInt(quantity) },
  //     ]);
  //     setSelectedProduct(null);
  //     setQuantity('0');
  //   }
  // };

  // Eliminar producto
  const handleRemoveProduct = (index: number) => {
    const updatedItems = [...invoiceItems];
    updatedItems.splice(index, 1);
    setInvoiceItems(updatedItems);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Start Modals  */}
        <ModalSearchClient
          showModal={showModalClient}
          selectedClient={selectedClient}
          setShowModal={setShowModalClient}
          setSelectedClient={setSelectedClient}
        />

        <ModalSearchProduct
          showModal={showModalProduct}
          selectedProduct={selectedProduct}
          setShowModal={setShowModalProduct}
          setSelectedProduct={setSelectedProduct}
        />
        {/* End Modals  */}

        <ScrollView>
          <View style={styles.containerScroll}>
            <Text variant='titleLarge' style={styles.headerText}>
              📜 Datos de la Factura
            </Text>

            <View>
              <Text variant='titleMedium' style={styles.label}>
                🔎 Buscar cliente
              </Text>
              {client === undefined ? (
                <Button
                  mode='contained'
                  icon={'magnify'}
                  style={styles.buttonModal}
                  onPress={() => setShowModalClient(true)}
                  contentStyle={{ flexDirection: 'row-reverse' }}
                >
                  Buscar
                </Button>
              ) : (
                <List.Item
                  left={(props) => <List.Icon {...props} icon='account' />}
                  title={`${client.name} ${client.lastName}`}
                  description={client.email}
                  onPress={() => setShowModalClient(true)}
                  style={{
                    backgroundColor: theme.colors.secondaryContainer,
                    borderRadius: 5,
                  }}
                />
              )}
            </View>

            <View>
              <Text variant='titleMedium' style={styles.label}>
                📅 Fecha:
              </Text>
              <TextInput
                label='Fecha (YYYY-MM-DD)'
                value={date}
                mode='outlined'
                onChangeText={setDate}
              />
            </View>

            <View>
              <Text variant='titleMedium' style={styles.label}>
                🔎 Buscar producto:
              </Text>
              {product === undefined ? (
                <Button
                  mode='contained'
                  icon={'magnify'}
                  style={styles.buttonModal}
                  onPress={() => setShowModalProduct(true)}
                  contentStyle={{ flexDirection: 'row-reverse' }}
                >
                  Buscar
                </Button>
              ) : (
                <List.Item
                  left={(props) => <List.Icon {...props} icon='account' />}
                  title={product.name}
                  description={`Stock Disponible: ${product.stock}`}
                  onPress={() => setShowModalProduct(true)}
                  style={{
                    backgroundColor: theme.colors.secondaryContainer,
                    borderRadius: 5,
                  }}
                />
              )}
            </View>

            <View>
              {product && (
                <>
                  <Text variant='titleMedium' style={styles.label}>
                    🔢 Cantidad:
                  </Text>
                  <TextInput
                    label='Cantidad'
                    value={quantity}
                    mode='outlined'
                    keyboardType='numeric'
                    onChangeText={(x) =>
                      (/^\d+$/.test(x) || x === '') && setQuantity(x)
                    }
                    error={
                      parseInt(quantity) > parseInt(product.stock.toString())
                    }
                  />
                  <HelperText
                    type='error'
                    visible={
                      parseInt(quantity) > parseInt(product.stock.toString())
                    }
                  >
                    La cantidad no puede superar el stock disponible.
                  </HelperText>
                </>
              )}
            </View>

            <Button
              mode='contained'
              // onPress={handleAddProduct}
              icon='cart-plus'
            >
              Agregar Producto
            </Button>

            {/* Lista de productos */}
            <Text style={styles.label}>🛍 Productos seleccionados:</Text>
            {invoiceItems.map((x, y) => (
              <Card key={y} style={styles.card}>
                <Card.Content>
                  <Text>
                    📦 {x.product} - {x.quantity} unidad(es)
                  </Text>
                </Card.Content>
                <Card.Actions>
                  <IconButton
                    icon='delete'
                    iconColor='red'
                    onPress={() => handleRemoveProduct(y)}
                  />
                </Card.Actions>
              </Card>
            ))}

            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>💰 Total: ${totalAmount}</Text>
              <Text style={styles.totalText}>
                📈 Total con IVA: ${totalWithIVA}
              </Text>
            </View>

            <Button mode='contained' onPress={() => {}} icon='receipt'>
              Generar Factura
            </Button>
          </View>
        </ScrollView>
        <Snackbar visible={showSnack} onDismiss={() => setShowSnack(false)}>
          {' '}
          ¡Factura creada exitosamente!
        </Snackbar>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerScroll: {
    marginHorizontal: 16,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginTop: 10,
    gap: 16,
  },
  headerText: { textAlign: 'center', fontWeight: 'semibold' },
  label: { fontWeight: 'semibold' },
  buttonModal: { width: 160, marginHorizontal: 'auto' },
  button: { marginTop: 20, backgroundColor: '#6200EE' },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#E3F2FD',
    borderRadius: 5,
  },
  totalText: { fontWeight: 'bold', textAlign: 'center' },
  card: { marginVertical: 5 },
});

const pickerStyles = {
  inputIOS: {
    borderWidth: 1,
    borderColor: '#6200EE',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: '#6200EE',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
};
