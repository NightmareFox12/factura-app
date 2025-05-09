import { invoicesData } from '@/test/invoiceData';
import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { DataTable, FAB, Searchbar, Button, Snackbar, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Invoices() {
  const insets = useSafeAreaInsets();

  //states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [invoices, setInvoices] = useState(invoicesData);
  const [showSnack, setShowSnack] = useState<boolean>(false);
  const [snackMessage, setSnackMessage] = useState<string>('');

  //functions
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setInvoices(
      invoicesData.filter((i) =>
        i.client.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const toggleStatus = (invoiceId: number) => {
    const updatedInvoices = invoices.map((invoice) => {
      if (invoice.id === invoiceId) {
        const newStatus = invoice.status === 'Aceptado' ? 'Cancelado' : 'Aceptado';

        Alert.alert(
          'Confirmación',
          `¿Seguro que deseas cambiar el estado a "${newStatus}"?`,
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Confirmar',
              onPress: () => {
                invoice.status = newStatus;
                setShowSnack(true);
                setSnackMessage(`Estado cambiado a ${newStatus}`);
                setInvoices([...updatedInvoices]);
              },
            },
          ]
        );
      }
      return invoice;
    });
  };

  return (
    <View style={styles.container}>
      <Searchbar value={searchQuery} onChangeText={handleSearch} placeholder="Buscar Factura..." style={styles.searchbar} />

      <ScrollView>
        <DataTable style={styles.dataTable}>
          <DataTable.Header>
            <DataTable.Title>📑 Número</DataTable.Title>
            <DataTable.Title>👤 Cliente</DataTable.Title>
            <DataTable.Title numeric style={{marginRight: 15}}>💰 Monto</DataTable.Title>
            <DataTable.Title>⚖️ Estado</DataTable.Title>
          </DataTable.Header>

          {invoices.map((invoice, index) => (
            <DataTable.Row key={invoice.id} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
              <DataTable.Cell style={{ flex: 1 }}>{invoice.number}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>{invoice.client}</DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 1 }}>${invoice.amountWithIVA}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 1 }}>
                <Button
                  mode="contained"
                  onPress={() => toggleStatus(invoice.id)}
                  style={invoice.status === 'Pagado' ? styles.paidButton : styles.cancelledButton}
                >
                  {invoice.status}
                </Button>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>

      <FAB
        icon="plus"
        label="Nueva factura"
        style={[styles.fab, { bottom: insets.bottom + 10 }]}
        onPress={() => console.log('Agregar nueva factura')}
      />

      <Snackbar visible={showSnack} onDismiss={() => setShowSnack(false)} duration={1500}>
        {snackMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  searchbar: { marginBottom: 20 },
  dataTable: { backgroundColor: '#ffffff', borderRadius: 10 },
  title: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  evenRow: { backgroundColor: '#E3F2FD' },
  oddRow: { backgroundColor: 'white' },
  paidButton: { backgroundColor: '#4CAF50', minWidth: 20, marginLeft: 10,},
  cancelledButton: { backgroundColor: '#F44336', minWidth: 20, marginLeft: 10, },
  fab: { position: 'absolute', right: 10 },
});
