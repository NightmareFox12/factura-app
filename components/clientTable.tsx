import { clientsData } from '@/dataTest/clientsData';
import { useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

type ClientTableProps = {
  searchQuery: string;
  filterSelected: number;
  selectedClient?: number | null;
  setSelectedClient?: React.Dispatch<React.SetStateAction<number | null>>;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ClientTable = ({
  searchQuery,
  selectedClient,
  filterSelected,
  setSelectedClient,
  setShowModal,
}: ClientTableProps) => {
  //memos
  const filteredClients = useMemo(() => {
    if (!searchQuery) return clientsData;
    return clientsData.filter((x) => {
      switch (filterSelected) {
        case 0:
          return x.curp.includes(searchQuery.toUpperCase());
        case 1:
          return x.name.toLowerCase().includes(searchQuery.toLowerCase());
        case 2:
          return x.phone.includes(searchQuery);
      }
    });
  }, [filterSelected, searchQuery]);

  return (
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
            <DataTable.Cell
              onPress={() => {
                selectedClient !== undefined &&
                  setSelectedClient !== undefined &&
                  setSelectedClient(x.id);
                setShowModal !== undefined && setShowModal(false);
              }}
              style={styles.itemTable}
            >
              {x.curp}
            </DataTable.Cell>
            <DataTable.Cell
              onPress={() => {
                selectedClient !== undefined &&
                  setSelectedClient !== undefined &&
                  setSelectedClient(x.id);
                setShowModal !== undefined && setShowModal(false);
              }}
              style={styles.itemTable}
            >
              {x.name}
            </DataTable.Cell>
            <DataTable.Cell
              onPress={() => {
                selectedClient !== undefined &&
                  setSelectedClient !== undefined &&
                  setSelectedClient(x.id);
                setShowModal !== undefined && setShowModal(false);
              }}
              style={styles.itemTable}
            >
              {x.phone}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dataTable: { backgroundColor: '#ffffff', borderRadius: 10 },
  itemTable: { flex: 1, justifyContent: 'center' },
  evenRow: { backgroundColor: '#E3F2FD' },
  oddRow: { backgroundColor: 'white' },
});

export default ClientTable;
