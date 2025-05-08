import { clientsData } from '@/test/clientsData';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable, FAB, Searchbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Clients() {
  const insets = useSafeAreaInsets();

  //states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [clients, setClients] = useState(clientsData);

  //functions
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
      <Searchbar
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder='Buscar Cliente'
      />

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Nombre</DataTable.Title>
          <DataTable.Title>Teléfono</DataTable.Title>
        </DataTable.Header>

        <ScrollView>
          {clients.map((x) => (
            <DataTable.Row key={x.id}>
              <DataTable.Cell>{x.name}</DataTable.Cell>
              <DataTable.Cell>{x.phone}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </ScrollView>
      </DataTable>

      <FAB
        icon='plus'
        label='Añadir cliente'
        style={[styles.fab, { bottom: insets.bottom + 10 }]}
        onPress={() => router.navigate('/screens/home/clients/form')}
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
