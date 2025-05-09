import React, { useMemo, useState } from 'react';
import { productsData } from '@/dataTest/productsData';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import SearchComponent, {
  IFilterListItems,
} from '@/components/searchComponent';
import { DataTable, FAB } from 'react-native-paper';
import ProductTable from '@/components/productTable';

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

      <ProductTable searchQuery={searchQuery} filterSelected={filterSelected} />
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

  fab: { position: 'absolute', right: 10 },
});
