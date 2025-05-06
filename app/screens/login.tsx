// import { useRouter } from "expo-router";
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
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

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => router.back()} />
          <Appbar.Content title='Iniciar Sesión' />
        </Appbar.Header>

        <SafeAreaView style={styles.container}>
          <Text variant='headlineSmall' style={{ textAlign: 'center' }}>
            Datos de la empresa
          </Text>

          <TextInput
            label='Nombre de la empresa'
            value={'Chocolates explosivos C.A'}
            mode='outlined'
            onChangeText={(text) => console.log(text)}
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
          {/* <View style={styles.containerLogo}>
            <Image
              style={styles.logo}
              source={{ uri: "https://picsum.photos/700" }}
            />
          </View> */}

          <Button
            mode='contained'
            onPress={() => router.navigate('/screens/login')}
            icon={'arrow-right'}
            contentStyle={{ flexDirection: 'row-reverse' }}
          >
            Continuar
          </Button>
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
    marginHorizontal: 25,
  },
  containerLogo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 200,
  },
});
