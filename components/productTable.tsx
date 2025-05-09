import { productsData } from '@/dataTest/productsData';
import { useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

type ProductTableProps = {
  searchQuery: string;
  filterSelected: number;
};

const ProductTable = ({ searchQuery, filterSelected }: ProductTableProps) => {
  //memo
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return productsData;
    return productsData.filter((x) => {
      switch (filterSelected) {
        case 0:
          return x.name.toLowerCase().includes(searchQuery.toLowerCase());
        case 1:
          return x.price.toString().includes(searchQuery);
        case 2:
          return x.stock.toString().includes(searchQuery);
      }
    });
  }, [filterSelected, searchQuery]);

  return (
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
  );
};

const styles = StyleSheet.create({
  dataTable: { backgroundColor: '#ffffff', borderRadius: 10 },
  title: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  evenRow: { backgroundColor: '#E3F2FD' },
  oddRow: { backgroundColor: 'white' },
});
export default ProductTable;
