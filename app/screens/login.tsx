import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Appbar,
  Button,
  PaperProvider,
  Text,
  TextInput,
} from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const router = useRouter();

  //states
  const [companyName, setCompanyName] = useState<string>('');

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => router.back()} />
          <Appbar.Content title='Iniciar Sesión' />
        </Appbar.Header>

        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={[styles.container, styles.containerScroll]}>
              <Text variant='headlineSmall' style={{ textAlign: 'center' }}>
                Datos de la empresa
              </Text>

              <TextInput
                label='Nombre de la empresa'
                value={companyName}
                mode='outlined'
                onChangeText={setCompanyName}
              />

              <TextInput
                label='CRF'
                value={'cafe'}
                mode='outlined'
                onChangeText={(text) => console.log(text)}
              />

              <TextInput
                label='???'
                value={'cafe'}
                mode='outlined'
                onChangeText={(text) => console.log(text)}
              />

              <TextInput
                label='???'
                value={'cafe'}
                mode='outlined'
                onChangeText={(text) => console.log(text)}
              />

              <Button
                style={styles.buttonSend}
                mode='contained'
                onPress={() => router.navigate('/screens/login')}
                icon={'arrow-right'}
                contentStyle={{ flexDirection: 'row-reverse' }}
              >
                Continuar
              </Button>
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
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
  containerLogo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonSend: {
    marginTop: 30,
    marginHorizontal: 20,
  },
});
