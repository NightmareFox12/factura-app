import { clientsData } from '@/test/clientsData';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable, TextInput, FAB } from 'react-native-paper';

export default function Clients() {
  //states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [clients, setClients] = useState(clientsData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setClients(
        clientsData.filter((c) =>
          c.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else setClients(clientsData);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label='Buscar cliente'
        value={searchQuery}
        onChangeText={handleSearch}
        mode='outlined'
        style={styles.input}
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
        style={styles.fab}
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
    right: 16,
    bottom: 16,
  },
});
