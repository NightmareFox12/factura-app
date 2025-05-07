// import { useRouter } from "expo-router";
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  Appbar,
  Button,
  PaperProvider,
  Text,
  TextInput,
  Avatar,
  Icon,
  IconButton,
  useTheme,
} from 'react-native-paper';
export default function CompanyScreen() {
  const router = useRouter();
  const theme = useTheme();

  //states
  const [companyName, setCompanyName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => router.back()} />
          <Appbar.Content title='Registro de Empresa' />
        </Appbar.Header>

        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.containerScroll}>
              <Text variant='titleMedium' style={{ textAlign: 'center' }}>
                Cargar Logo
              </Text>

              <IconButton
                icon={'folder'}
                onPress={() => console.log('fisr')}
                containerColor={theme.colors.primary}
                size={30}
                style={styles.iconButton}
              />

              <View style={[styles.container, styles.containerScroll]}>
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
                  label='Correo Electrónico'
                  value={email}
                  mode='outlined'
                  onChangeText={setEmail}
                />
                <TextInput
                  label='.CER'
                  value={'cafe'}
                  mode='outlined'
                  onChangeText={(text) => console.log(text)}
                />
                <TextInput
                  label='.KEY'
                  value={'cafe'}
                  mode='outlined'
                  onChangeText={(text) => console.log(text)}
                />
                <TextInput
                  label='logo'
                  value={'cafe'}
                  mode='outlined'
                  onChangeText={(text) => console.log(text)}
                />
              </View>
              {/* TODO: CONFIRMAR TODOS LOS DATOS ANTES DE ENVIAR */}
              <Button
                style={styles.buttonSend}
                mode='contained'
                onPress={() =>
                  router.navigate('/screens/register/personalScreen')
                }
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
  iconButton: {
    marginHorizontal: 'auto',
    width: 50,
    height: 50,
    borderRadius: 200,
  },
  buttonSend: {
    marginTop: 30,
    marginHorizontal: 20,
  },
});
