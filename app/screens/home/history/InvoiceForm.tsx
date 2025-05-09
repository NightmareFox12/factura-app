import React, { useState, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  Snackbar,
  Text,
  TextInput,
  Searchbar,
  HelperText,
  IconButton,
  Card,
} from 'react-native-paper';
// import RNPickerSelect from 'react-native-picker-select';
import { productsData } from '@/dataTest/productsData';
import { clientsData } from '@/dataTest/clientsData';
import { invoicesData } from '@/dataTest/invoiceData';
import ModalSearchClient from '@/components/modalSearchClient';

export default function InvoiceForm() {
  // states
  const [selectedClient, setSelectedClient] = useState<number | null>(null);

  const [clientSearch, setClientSearch] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [productSearch, setProductSearch] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('0');
  const [invoiceItems, setInvoiceItems] = useState<
    { product: string; quantity: number }[]
  >([]);
  const [showSnack, setShowSnack] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  //functions
  const filteredClients = useMemo(
    () =>
      clientsData.filter((client) =>
        client.name.toLowerCase().includes(clientSearch.toLowerCase())
      ),
    [clientSearch]
  );

  const filteredProducts = useMemo(
    () =>
      productsData.filter((product) =>
        product.name.toLowerCase().includes(productSearch.toLowerCase())
      ),
    [productSearch]
  );

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
  const handleAddProduct = () => {
    if (selectedProduct && parseInt(quantity) > 0) {
      setInvoiceItems([
        ...invoiceItems,
        { product: selectedProduct, quantity: parseInt(quantity) },
      ]);
      setSelectedProduct(null);
      setQuantity('0');
    }
  };

  // Eliminar producto
  const handleRemoveProduct = (index: number) => {
    const updatedItems = [...invoiceItems];
    updatedItems.splice(index, 1);
    setInvoiceItems(updatedItems);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ModalSearchClient
          setShowModal={setShowModal}
          showModal={showModal}
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
        />

        <ScrollView>
          <View style={styles.containerScroll}>
            <Text variant='titleLarge' style={styles.headerText}>
              📜 Datos de la Factura
            </Text>

            <Text variant='titleMedium' style={styles.label}>
              🔎 Buscar cliente
            </Text>
            <Button
              mode='contained'
              icon={'magnify'}
              style={styles.buttonModal}
              onPress={() => setShowModal(true)}
              contentStyle={{ flexDirection: 'row-reverse' }}
            >
              Buscar
            </Button>

            <Text style={styles.label}>👤 Cliente:</Text>

            <Text style={styles.label}>📅 Fecha:</Text>
            <TextInput
              label='Fecha (YYYY-MM-DD)'
              value={date}
              mode='outlined'
              onChangeText={setDate}
            />

            <Text style={styles.label}>🔎 Buscar producto:</Text>
            <Searchbar
              placeholder='Buscar producto...'
              value={productSearch}
              onChangeText={setProductSearch}
            />

            <Text style={styles.label}>🛒 Producto:</Text>
            {/* <RNPickerSelect 
              onValueChange={(value) => setSelectedProduct(value)} 
              items={filteredProducts.map(product => ({ label: product.name, value: product.name }))} 
              placeholder={{ label: 'Selecciona un producto', value: null }} 
              style={pickerStyles} 
            /> */}

            <Text style={styles.label}>🔢 Cantidad:</Text>
            <TextInput
              label='Cantidad'
              value={quantity}
              mode='outlined'
              keyboardType='numeric'
              onChangeText={(x) =>
                (/^\d+$/.test(x) || x === '') && setQuantity(x)
              }
            />

            {/* <HelperText type="error" visible={parseInt(quantity) > (productsData.find((p) => p.name === selectedProduct)?.stock || 0)}>
              La cantidad no puede superar el stock disponible.
            </HelperText> */}

            <Button
              style={styles.button}
              mode='contained'
              onPress={handleAddProduct}
              icon='cart-plus'
            >
              Agregar Producto
            </Button>

            {/* Lista de productos */}
            <Text style={styles.label}>🛍 Productos seleccionados:</Text>
            {invoiceItems.map((item, index) => (
              <Card key={index} style={styles.card}>
                <Card.Content>
                  <Text>
                    📦 {item.product} - {item.quantity} unidad(es)
                  </Text>
                </Card.Content>
                <Card.Actions>
                  <IconButton
                    icon='delete'
                    iconColor='red'
                    onPress={() => handleRemoveProduct(index)}
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
