import React, { useMemo, useState } from 'react';
import { clientsData } from '@/dataTest/clientsData';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import SearchComponent, {
  IFilterListItems,
} from '@/components/searchComponent';
import { DataTable, FAB } from 'react-native-paper';
import ClientTable from '@/components/clientTable';

export const filterClientItems: IFilterListItems[] = [
  {
    id: 0,
    title: 'CURP',
    icon: 'file-document',
  },
  {
    id: 1,
    title: 'name',
    icon: 'text',
  },
  {
    id: 2,
    title: 'Teléfono',
    icon: 'phone',
  },
];

export default function Clients() {
  const insets = useSafeAreaInsets();

  //states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterSelected, setFilterSelected] = useState<number>(0);

  return (
    <View style={styles.container}>
      <SearchComponent
        inputLabel='Buscar Cliente...'
        searchQuery={searchQuery}
        filterSelected={filterSelected}
        items={filterClientItems}
        setSearchQuery={setSearchQuery}
        setFilterSelected={setFilterSelected}
      />

      <ClientTable
        searchQuery={searchQuery}
        filterSelected={filterSelected}
      />

      <FAB
        icon='plus'
        label='Añadir Cliente'
        style={[styles.fab, { bottom: insets.bottom + 10 }]}
        onPress={() => router.navigate('/screens/home/clients/form')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  dataTable: { backgroundColor: '#ffffff', borderRadius: 10 },
  itemTable: { flex: 1, justifyContent: 'center' },
  evenRow: { backgroundColor: '#E3F2FD' },
  oddRow: { backgroundColor: 'white' },
  fab: { position: 'absolute', right: 10 },
});
