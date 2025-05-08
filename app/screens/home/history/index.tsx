import { invoicesData } from '@/test/invoiceData';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable, FAB, Searchbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Invoices() {
  const insets = useSafeAreaInsets();

  //states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [invoices, setInvoices] = useState(invoicesData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setInvoices(
      invoicesData.filter((i) =>
        i.client.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder='Buscar Factura'
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Número</DataTable.Title>
          <DataTable.Title>Cliente</DataTable.Title>
          <DataTable.Title numeric style={{ marginRight: 10 }}>
            Monto
          </DataTable.Title>
          <DataTable.Title>Estado</DataTable.Title>
        </DataTable.Header>

        {invoices.map((invoice) => (
          <DataTable.Row key={invoice.id}>
            <DataTable.Cell>{invoice.number}</DataTable.Cell>
            <DataTable.Cell>{invoice.client}</DataTable.Cell>
            <DataTable.Cell numeric style={{ marginRight: 10 }}>
              {invoice.amount}
            </DataTable.Cell>

            <DataTable.Cell>{invoice.status}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      <FAB
        icon='plus'
        label='Nueva factura'
        style={[styles.fab, { bottom: insets.bottom + 10 }]}
        onPress={() => console.log('Agregar nueva factura')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    right: 10,
  },
});
