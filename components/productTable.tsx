import { productsData } from '@/dataTest/productsData';
import { useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

type ProductTableProps = {
  searchQuery: string;
  filterSelected: number;
  selectedProduct?: number | null;
  setSelectedProduct?: React.Dispatch<React.SetStateAction<number | null>>;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductTable = ({
  searchQuery,
  filterSelected,
  selectedProduct,
  setSelectedProduct,
  setShowModal,
}: ProductTableProps) => {
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
          <DataTable.Title style={styles.listItem}>📦 Nombre</DataTable.Title>
          <DataTable.Title style={styles.listItem}>💰 Precio</DataTable.Title>
          <DataTable.Title style={styles.listItem}>📦 Stock</DataTable.Title>
          <DataTable.Title style={styles.listItem}>⚖️ IVA</DataTable.Title>
        </DataTable.Header>

        {filteredProducts.map((x, y) => (
          <DataTable.Row
            key={x.id}
            style={y % 2 === 0 ? styles.evenRow : styles.oddRow}
          >
            <DataTable.Cell
              style={styles.listItem}
              onPress={() => {
                selectedProduct !== undefined &&
                  setSelectedProduct !== undefined &&
                  setSelectedProduct(x.id);
                setShowModal !== undefined && setShowModal(false);
              }}
            >
              {x.name}
            </DataTable.Cell>
            <DataTable.Cell
              style={styles.listItem}
              onPress={() => {
                selectedProduct !== undefined &&
                  setSelectedProduct !== undefined &&
                  setSelectedProduct(x.id);
                setShowModal !== undefined && setShowModal(false);
              }}
            >
              ${x.price}
            </DataTable.Cell>
            <DataTable.Cell
              style={styles.listItem}
              onPress={() => {
                selectedProduct !== undefined &&
                  setSelectedProduct !== undefined &&
                  setSelectedProduct(x.id);
                setShowModal !== undefined && setShowModal(false);
              }}
            >
              {x.stock}
            </DataTable.Cell>
            <DataTable.Cell
              style={styles.listItem}
              onPress={() => {
                selectedProduct !== undefined &&
                  setSelectedProduct !== undefined &&
                  setSelectedProduct(x.id);
                setShowModal !== undefined && setShowModal(false);
              }}
            >
              {x.IVA ? '✅' : '❌'}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dataTable: { backgroundColor: '#ffffff', borderRadius: 5 },
  title: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  listItem: { flex: 1, justifyContent: 'center' },
  evenRow: { backgroundColor: '#E3F2FD' },
  oddRow: { backgroundColor: 'white' },
});
export default ProductTable;
