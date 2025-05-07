import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function ClientForm() {
  const router = useRouter();

  // states
  const [dni, setDni] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={[styles.container, styles.containerScroll]}>
            <Text
              variant='headlineSmall'
              style={{ textAlign: 'center', marginTop: 50 }}
            >
              Datos del Cliente
            </Text>

            <TextInput
              label='DNI'
              value={dni}
              mode='outlined'
              keyboardType='numeric'
              onChangeText={setDni}
            />

            <TextInput
              label='Nombre'
              value={name}
              mode='outlined'
              onChangeText={setName}
            />

            <TextInput
              label='Teléfono'
              value={phone}
              mode='outlined'
              keyboardType='phone-pad'
              onChangeText={setPhone}
            />

            <TextInput
              label='Correo Electrónico'
              value={email}
              mode='outlined'
              keyboardType='email-address'
              onChangeText={setEmail}
            />

            <TextInput
              label='Dirección'
              value={address}
              mode='outlined'
              multiline
              onChangeText={setAddress}
            />

            <Button
              style={styles.buttonSend}
              mode='contained'
              onPress={() => console.log('Cliente guardado')}
              icon={'arrow-right'}
              contentStyle={{ flexDirection: 'row-reverse' }}
            >
              Guardar Cliente
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  containerScroll: {
    marginHorizontal: 16,
  },
  buttonSend: {
    marginTop: 30,
    marginHorizontal: 20,
  },
});
