import React, { useMemo, useState } from 'react';
import { productsData } from '@/dataTest/productsData';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import SearchComponent, {
  IFilterListItems,
} from '@/components/searchComponent';
import { DataTable, FAB } from 'react-native-paper';

const filterItems: IFilterListItems[] = [
  {
    id: 0,
    title: 'Nombre',
    icon: 'package-variant',
  },
  {
    id: 1,
    title: 'Precio',
    icon: 'currency-usd',
  },
  {
    id: 2,
    title: 'Stock',
    icon: 'dolly',
  },
];

export default function Products() {
  const insets = useSafeAreaInsets();

  //states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterSelected, setFilterSelected] = useState<number>(0);

  //memo
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return productsData;
    return productsData.filter((x) => {
      switch (filterSelected) {
        case 0:
          return x.name.toLowerCase().includes(searchQuery.toLowerCase());
        case 1:
          return x.price.includes(searchQuery);
        case 2:
          return x.stock.toString().includes(searchQuery);
      }
    });
  }, [filterSelected, searchQuery]);

  /**
   * TODO: componentizar las tablas
   * TODO: me falta history y arreglar lo de las facturas
   */
  return (
    <View style={styles.container}>
      <SearchComponent
        inputLabel='Buscar producto...'
        filterSelected={filterSelected}
        searchQuery={searchQuery}
        items={filterItems}
        setFilterSelected={setFilterSelected}
        setSearchQuery={setSearchQuery}
      />

      <ScrollView>
        <DataTable style={styles.dataTable}>
          <DataTable.Header>
            <DataTable.Title>📦 Nombre</DataTable.Title>
            <DataTable.Title numeric>💰 Precio</DataTable.Title>
            <DataTable.Title numeric>📦 Stock</DataTable.Title>
            <DataTable.Title style={{ marginLeft: 30 }}>⚖️ IVA</DataTable.Title>
          </DataTable.Header>

          {filteredProducts.map((x, y) => (
            <DataTable.Row
              key={x.id}
              style={y % 2 === 0 ? styles.evenRow : styles.oddRow}
            >
              <DataTable.Cell style={{ flex: 2 }}>{x.name}</DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 1, marginRight: 15 }}>
                ${x.price}
              </DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 1, marginRight: 30 }}>
                {x.stock}
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 1, marginLeft: 30 }}>
                {x.IVA ? '✅' : '❌'}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>

      <FAB
        icon='plus'
        label='Añadir producto'
        style={[styles.fab, { bottom: insets.bottom + 10 }]}
        onPress={() => router.navigate('/screens/home/products/form')}
      />
    </View>
  );
}

//TODO: NO COLORES ESTATICOS
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
