import React, { useState, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, Snackbar, Text, TextInput, Searchbar, HelperText, IconButton, Card } from 'react-native-paper';
// import RNPickerSelect from 'react-native-picker-select';
import { productsData } from '@/dataTest/productsData';
import { clientsData } from '@/dataTest/clientsData';
import { invoicesData } from '@/dataTest/invoiceData';

export default function InvoiceForm() {
  // Estados
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [clientSearch, setClientSearch] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [productSearch, setProductSearch] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('0');
  const [invoiceItems, setInvoiceItems] = useState<{ product: string; quantity: number }[]>([]);
  const [showSnack, setShowSnack] = useState<boolean>(false);

  const filteredClients = useMemo(() => 
    clientsData.filter((client) => client.name.toLowerCase().includes(clientSearch.toLowerCase()))
  , [clientSearch]);

  const filteredProducts = useMemo(() => 
    productsData.filter((product) => product.name.toLowerCase().includes(productSearch.toLowerCase()))
  , [productSearch]);

  // Cálculo de montos totales
  const totalAmount = useMemo(() => {
    return invoiceItems.reduce((total, item) => {
      const product = productsData.find((p) => p.name === item.product);
      return total + (product ? parseFloat(product.price) * item.quantity : 0);
    }, 0).toFixed(2);
  }, [invoiceItems]);

  const totalWithIVA = useMemo(() => {
    return invoiceItems.reduce((total, item) => {
      const product = productsData.find((p) => p.name === item.product);
      const productPrice = product ? parseFloat(product.price) * item.quantity : 0;
      const ivaAmount = product?.IVA ? productPrice * 0.16 : 0;
      return total + productPrice + ivaAmount;
    }, 0).toFixed(2);
  }, [invoiceItems]);

  // Agregar producto
  const handleAddProduct = () => {
    if (selectedProduct && parseInt(quantity) > 0) {
      setInvoiceItems([...invoiceItems, { product: selectedProduct, quantity: parseInt(quantity) }]);
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
        <ScrollView>
          <View style={styles.containerScroll}>
            <Text style={styles.header}>📜 Datos de la Factura</Text>

            <Text style={styles.label}>🔎 Buscar cliente:</Text>
            <Searchbar placeholder="Buscar cliente..." value={clientSearch} onChangeText={setClientSearch} />

            <Text style={styles.label}>👤 Cliente:</Text>
            {/* <RNPickerSelect 
              onValueChange={(value) => setSelectedClient(value)} 
              items={filteredClients.map(client => ({ label: client.name, value: client.name }))} 
              placeholder={{ label: 'Selecciona un cliente', value: null }} 
              style={pickerStyles} 
            /> */}

            <Text style={styles.label}>📅 Fecha:</Text>
            <TextInput label="Fecha (YYYY-MM-DD)" value={date} mode="outlined" onChangeText={setDate} />

            <Text style={styles.label}>🔎 Buscar producto:</Text>
            <Searchbar placeholder="Buscar producto..." value={productSearch} onChangeText={setProductSearch} />

            <Text style={styles.label}>🛒 Producto:</Text>
            {/* <RNPickerSelect 
              onValueChange={(value) => setSelectedProduct(value)} 
              items={filteredProducts.map(product => ({ label: product.name, value: product.name }))} 
              placeholder={{ label: 'Selecciona un producto', value: null }} 
              style={pickerStyles} 
            /> */}

            <Text style={styles.label}>🔢 Cantidad:</Text>
            <TextInput label="Cantidad" value={quantity} mode="outlined" keyboardType="numeric"
              onChangeText={(x) => (/^\d+$/.test(x) || x === '') && setQuantity(x)} />

            <HelperText type="error" visible={parseInt(quantity) > (productsData.find((p) => p.name === selectedProduct)?.stock || 0)}>
              La cantidad no puede superar el stock disponible.
            </HelperText>

            <Button style={styles.button} mode="contained" onPress={handleAddProduct} icon="cart-plus">Agregar Producto</Button>

            {/* Lista de productos */}
            <Text style={styles.label}>🛍 Productos seleccionados:</Text>
            {invoiceItems.map((item, index) => (
              <Card key={index} style={styles.card}>
                <Card.Content>
                  <Text>📦 {item.product} - {item.quantity} unidad(es)</Text>
                </Card.Content>
                <Card.Actions>
                  <IconButton icon="delete" iconColor="red" onPress={() => handleRemoveProduct(index)} />
                </Card.Actions>
              </Card>
            ))}

            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>💰 Total: ${totalAmount}</Text>
              <Text style={styles.totalText}>📈 Total con IVA: ${totalWithIVA}</Text>
            </View>

            <Button style={styles.button} mode="contained" onPress={() => {}} icon="receipt">Generar Factura</Button>
          </View>
        </ScrollView>
        <Snackbar visible={showSnack} onDismiss={() => setShowSnack(false)}>✅ ¡Factura generada!</Snackbar>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerScroll: { marginHorizontal: 16, padding: 16, backgroundColor: '#f8f8f8', borderRadius: 10 },
  header: { textAlign: 'center', marginVertical: 20, fontWeight: 'bold' },
  label: { marginTop: 25, marginBottom: 8, fontWeight: 'bold' },
  button: { marginTop: 20, backgroundColor: '#6200EE' },
  totalContainer: { marginTop: 20, padding: 10, backgroundColor: '#E3F2FD', borderRadius: 5 },
  totalText: { fontWeight: 'bold', textAlign: 'center' },
  card: { marginVertical: 5 },
});

const pickerStyles = {
  inputIOS: { borderWidth: 1, borderColor: '#6200EE', backgroundColor: 'white', padding: 10, borderRadius: 5 },
  inputAndroid: { borderWidth: 1, borderColor: '#6200EE', backgroundColor: 'white', padding: 10, borderRadius: 5 },
};

