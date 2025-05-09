import React, { useMemo, useState } from 'react';
import { clientsData } from '@/dataTest/clientsData';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import SearchComponent, {
  IFilterListItems,
} from '@/components/searchComponent';
import { DataTable, FAB } from 'react-native-paper';

const listItems: IFilterListItems[] = [
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

  //memos
  const filteredClients = useMemo(() => {
    if (!searchQuery) return clientsData;
    return clientsData.filter((x) => {
      switch (filterSelected) {
        case 0:
          return x.curp.includes(searchQuery);
        case 1:
          return x.name.toLowerCase().includes(searchQuery.toLowerCase());
        case 2:
          return x.phone.includes(searchQuery);
      }
    });
  }, [filterSelected, searchQuery]);

  return (
    <View style={styles.container}>
      <SearchComponent
        searchQuery={searchQuery}
        filterSelected={filterSelected}
        items={listItems}
        setSearchQuery={setSearchQuery}
        setFilterSelected={setFilterSelected}
      />

      <ScrollView>
        <DataTable style={styles.dataTable}>
          <DataTable.Header>
            <DataTable.Title>📌 CURP</DataTable.Title>
            <DataTable.Title>👤 Nombre</DataTable.Title>
            <DataTable.Title>📞 Teléfono</DataTable.Title>
          </DataTable.Header>

          {filteredClients.map((x, y) => (
            <DataTable.Row
              key={x.id}
              style={y % 2 === 0 ? styles.evenRow : styles.oddRow}
            >
              <DataTable.Cell style={{ flex: 1 }}>{x.curp}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>{x.name}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 1 }}>{x.phone}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>

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
  header: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },

  dataTable: { backgroundColor: '#ffffff', borderRadius: 10 },
  title: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  evenRow: { backgroundColor: '#E3F2FD' },
  oddRow: { backgroundColor: 'white' },
  fab: { position: 'absolute', right: 10 },
});
