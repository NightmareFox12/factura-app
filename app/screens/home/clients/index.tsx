import React, { useState } from 'react';
import { clientsData } from '@/test/clientsData';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DataTable, FAB, Searchbar, Text } from 'react-native-paper';
import { router } from 'expo-router';

export default function Clients() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [clients, setClients] = useState(clientsData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setClients(
      clientsData.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <View style={styles.container}>
      <Searchbar value={searchQuery} onChangeText={handleSearch} placeholder="Buscar Cliente..." style={styles.searchbar} />

      <ScrollView>
        <DataTable style={styles.dataTable}>
          <DataTable.Header>
            <DataTable.Title>📌 DNI</DataTable.Title>
            <DataTable.Title>👤 Nombre</DataTable.Title>
            <DataTable.Title>📞 Teléfono</DataTable.Title>
          </DataTable.Header>

          {clients.map((client, index) => (
            <DataTable.Row key={client.id} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
              <DataTable.Cell style={{ flex: 1 }}>{client.dni}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>{client.name}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 1 }}>{client.phone}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>

      <FAB
        icon="plus"
        label="Añadir Cliente"
        style={[styles.fab, { bottom: insets.bottom + 10 }]}
        onPress={() => router.navigate('/screens/home/clients/form')}
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
