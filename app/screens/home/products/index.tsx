import React, { useMemo, useState } from 'react';
import { productsData } from '@/test/productsData';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DataTable, FAB, Searchbar, Text } from 'react-native-paper';
import { router } from 'expo-router';

export default function Products() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return productsData;
    return productsData.filter((x) => x.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  return (
    <View style={styles.container}>

      <Searchbar value={searchQuery} onChangeText={handleSearch} placeholder="Buscar producto..." style={styles.searchbar} />

      <ScrollView>
        <DataTable style={styles.dataTable}>
          <DataTable.Header>
            <DataTable.Title>📦 Nombre</DataTable.Title>
            <DataTable.Title numeric>💰 Precio</DataTable.Title>
            <DataTable.Title numeric>📦 Stock</DataTable.Title>
            <DataTable.Title style={{ marginLeft: 30 }}>⚖️ IVA</DataTable.Title>
          </DataTable.Header>

          {filteredProducts.map((product, index) => (
            <DataTable.Row key={product.id} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
              <DataTable.Cell style={{ flex: 2 }}>{product.name}</DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 1, marginRight: 15 }}>${product.price}</DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 1, marginRight: 30 }}>{product.stock}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 1, marginLeft: 30 }}>{product.IVA ? '✅' : '❌'}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>

      <FAB
        icon="plus"
        label="Añadir producto"
        style={[styles.fab, { bottom: insets.bottom + 10 }]}
        onPress={() => router.navigate('/screens/home/products/form')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { textAlign: 'center', marginBottom: 20, fontWeight: 'bold', fontSize: 22,},
  searchbar: { marginBottom: 20 },
  dataTable: { backgroundColor: '#ffffff', borderRadius: 10 },
  title: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  evenRow: { backgroundColor: '#E3F2FD' },
  oddRow: { backgroundColor: 'white' },
  fab: { position: 'absolute', right: 10 },
});
