import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable, TextInput, FAB } from 'react-native-paper';

const clientsData = [
  { id: 1, name: 'Juan Pérez', phone: '0412-1234567' },
  { id: 2, name: 'María González', phone: '0414-7654321' },
  { id: 3, name: 'Carlos Rodríguez', phone: '0426-2345678' },
  { id: 4, name: 'Ana Martínez', phone: '0416-8765432' },
];

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

        {clients.map((client) => (
          <DataTable.Row key={client.id}>
            <DataTable.Cell>{client.name}</DataTable.Cell>
            <DataTable.Cell>{client.phone}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      <FAB
        icon='plus'
        label='Añadir cliente'
        style={styles.fab}
        onPress={() => console.log('Agregar nuevo cliente')}
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
