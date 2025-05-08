import React, { useState } from 'react';
import { productsData } from '@/test/productsData';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DataTable, FAB, Searchbar } from 'react-native-paper';
import { router } from 'expo-router';

export default function Products() {
  const insets = useSafeAreaInsets();

  //states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState(productsData);

  //functions
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setProducts(
      productsData.filter((x) =>
        x.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <View style={styles.container}>
      <Searchbar
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder='Buscar producto'
      />

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Nombre</DataTable.Title>
          <DataTable.Title numeric>Precio</DataTable.Title>
          <DataTable.Title numeric>Stock</DataTable.Title>
        </DataTable.Header>

        <ScrollView>
          {products.map((product) => (
            <DataTable.Row key={product.id}>
              <DataTable.Cell>{product.name}</DataTable.Cell>
              <DataTable.Cell numeric>{product.price}</DataTable.Cell>
              <DataTable.Cell numeric>{product.stock}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </ScrollView>
      </DataTable>

      <FAB
        icon='plus'
        label='Añadir producto'
        style={[styles.fab, { bottom: insets.bottom + 10 }]}
        onPress={() => router.navigate('/screens/home/products/form')}
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
