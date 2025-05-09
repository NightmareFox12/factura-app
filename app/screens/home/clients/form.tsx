import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { clientsData } from '@/dataTest/clientsData';

export default function ClientForm() {
  const [form, setForm] = useState({
    dni: '',
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  const [loadingCreation, setLoadingCreation] = useState<boolean>(false);
  const [showSnack, setShowSnack] = useState<boolean>(false);

  // Función para guardar el cliente
  const handleCreateClient = async () => {
    try {
      setLoadingCreation(true);
      clientsData.push({
        id: clientsData.length + 1,
        ...form,
      });

      setForm({
        dni: '',
        name: '',
        phone: '',
        email: '',
        address: '',
      });
      setShowSnack(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingCreation(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.containerScroll}>
            <Text variant='headlineSmall' style={styles.header}>
              🏷️ Datos del Cliente
            </Text>

            <Text style={styles.label}>📌 DNI:</Text>
            <TextInput
              value={form.dni}
              mode='outlined'
              keyboardType='numeric'
              onChangeText={(value) =>
                setForm((prev) => ({ ...prev, dni: value }))
              }
            />

            <Text style={styles.label}>👤 Nombre:</Text>
            <TextInput
              value={form.name}
              mode='outlined'
              onChangeText={(value) =>
                setForm((prev) => ({ ...prev, name: value }))
              }
            />

            <Text style={styles.label}>📞 Teléfono:</Text>
            <TextInput
              value={form.phone}
              mode='outlined'
              keyboardType='phone-pad'
              onChangeText={(value) =>
                setForm((prev) => ({ ...prev, phone: value }))
              }
            />

            <Text style={styles.label}>📧 Correo Electrónico:</Text>
            <TextInput
              value={form.email}
              mode='outlined'
              keyboardType='email-address'
              onChangeText={(value) =>
                setForm((prev) => ({ ...prev, email: value }))
              }
            />

            <Text style={styles.label}>📍 Dirección:</Text>
            <TextInput
              value={form.address}
              mode='outlined'
              multiline
              onChangeText={(value) =>
                setForm((prev) => ({ ...prev, address: value }))
              }
            />

            <Button
              style={styles.buttonSend}
              mode='contained'
              onPress={handleCreateClient}
              icon={'account-check'}
              loading={loadingCreation}
              contentStyle={{ flexDirection: 'row-reverse' }}
              disabled={
                form.dni === '' ||
                form.name.length < 2 ||
                form.phone === '' ||
                form.email === '' ||
                form.address === '' ||
                loadingCreation
              }
            >
              {loadingCreation ? 'Guardando...' : 'Guardar Cliente'}
            </Button>
          </View>
        </ScrollView>
        <Snackbar
          visible={showSnack}
          onDismiss={() => setShowSnack(false)}
          duration={1500}
          action={{
            label: '',
            icon: 'close',
            onPress: () => setShowSnack(false),
          }}
        >
          ¡Cliente guardado exitosamente!
        </Snackbar>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerScroll: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  header: {
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  label: { marginTop: 20, marginBottom: 5, fontWeight: 'bold', color: '#333' },
  buttonSend: { marginTop: 30 },
});
