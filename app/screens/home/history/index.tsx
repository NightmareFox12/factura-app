import { invoicesData } from '@/dataTest/invoiceData';
import React, { useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchComponent, {
  IFilterListItems,
} from '@/components/searchComponent';
import { clientsData } from '@/dataTest/clientsData';
import { IInvoiceStatus } from '@/types/invoice.entity';
import {
  DataTable,
  FAB,
  Dialog,
  Text,
  Portal,
  IconButton,
  useTheme,
} from 'react-native-paper';
import ModalStatusInvoice from '@/components/modalStatusInvoice';

const filterItems: IFilterListItems[] = [
  {
    id: 0,
    title: 'Número',
    icon: 'numeric',
  },
  {
    id: 1,
    title: 'Nombre',
    icon: 'text',
  },
  {
    id: 2,
    title: 'Monto',
    icon: 'currency-usd',
  },
];

export default function Invoices() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  //states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterSelected, setFilterSelected] = useState<number>(0);

  const [invoiceSelected, setInvoiceSelected] = useState<{
    invoiceID: number | null;
    showModal: boolean;
  }>({ invoiceID: null, showModal: false });

  //memos
  const filterInvoices = useMemo(() => {
    if (!searchQuery) return invoicesData;

    return invoicesData.filter((x) => {
      switch (filterSelected) {
        case 0:
          return x.number.includes(searchQuery.toUpperCase());
        case 1:
          const name =
            clientsData.find((client) => x.clientID === client.id)?.name ?? '';
          return name.toLowerCase().includes(searchQuery.toLowerCase());
        case 2:
          return x.amount.includes(searchQuery);
      }
    });
  }, [filterSelected, searchQuery]);

  //functions
  const toggleStatus = (invoiceId: number) => {
    const updatedInvoices = invoicesData.map((invoice) => {
      if (invoice.id === invoiceId) {
        // const newStatus =
        // invoice.status === 'Aceptado' ? 'Cancelado' : 'Aceptado';
        // Alert.alert(
        //   'Confirmación',
        //   `¿Seguro que deseas cambiar el estado a "${newStatus}"?`,
        //   [
        //     { text: 'Cancelar', style: 'cancel' },
        //     {
        //       text: 'Confirmar',
        //       onPress: () => {
        //         invoice.status = newStatus;
        //         setShowSnack(true);
        //         setSnackMessage(`Estado cambiado a ${newStatus}`);
        //         setInvoices([...updatedInvoices]);
        //       },
        //     },
        //   ]
        // );
      } else return;
      return invoice;
    });
  };

  /**
   * TODO: componentizar las tablas
   * TODO: me falta history y arreglar lo de las facturas
   */
  return (
    <View style={styles.container}>
      <SearchComponent
        inputLabel='Buscar Factura'
        searchQuery={searchQuery}
        filterSelected={filterSelected}
        items={filterItems}
        setSearchQuery={setSearchQuery}
        setFilterSelected={setFilterSelected}
      />
      <ModalStatusInvoice
        invoiceSelected={invoiceSelected}
        setInvoiceSelected={setInvoiceSelected}
      />

      <ScrollView>
        <DataTable style={styles.dataTable}>
          <DataTable.Header>
            <DataTable.Title>📑 Número</DataTable.Title>
            <DataTable.Title>👤 Cliente</DataTable.Title>
            <DataTable.Title>💰 Monto</DataTable.Title>
            <DataTable.Title>⚖️ Estado</DataTable.Title>
          </DataTable.Header>

          {filterInvoices.map((invoice, index) => (
            <DataTable.Row
              key={invoice.id}
              style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
            >
              <DataTable.Cell>{invoice.number}</DataTable.Cell>
              <DataTable.Cell style={styles.listItem}>
                {clientsData.find((x) => x.id === invoice.clientID)?.name ?? ''}{' '}
                {clientsData.find((x) => x.id === invoice.clientID)?.lastName ??
                  ''}
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.listItem}>
                ${invoice.amountWithIVA}
              </DataTable.Cell>
              <DataTable.Cell style={styles.listItem}>
                <IconButton
                  mode='contained'
                  iconColor={theme.colors.onPrimary}
                  icon={
                    invoice.status === IInvoiceStatus.Completed
                      ? 'check'
                      : 'close'
                  }
                  onPress={() =>
                    setInvoiceSelected({
                      invoiceID: invoice.id,
                      showModal: true,
                    })
                  }
                  style={
                    invoice.status === IInvoiceStatus.Completed
                      ? styles.completedButton
                      : styles.cancelledButton
                  }
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
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
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  dataTable: { backgroundColor: '#ffffff', borderRadius: 10 },
  listItem: { flex: 1, justifyContent: 'center' },
  evenRow: { backgroundColor: '#E3F2FD' },
  oddRow: { backgroundColor: 'white' },
  completedButton: { backgroundColor: '#4CAF50' },
  cancelledButton: { backgroundColor: '#F44336' },
  fab: { position: 'absolute', right: 10 },
});
