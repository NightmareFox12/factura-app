import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, PaperProvider, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

export default function Main() {
  const router = useRouter();

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerLogo}>
          <Image
            style={styles.logo}
            source={{ uri: 'https://picsum.photos/700' }}
          />
        </View>

        <Text variant='headlineSmall' style={{ textAlign: 'center' }}>
          Factura App
        </Text>

        <Button
          mode='contained'
          onPress={() =>
            router.navigate('/screens/register/companyDocumentScreen')
          }
          icon={'domain'}
          contentStyle={{ flexDirection: 'row-reverse' }}
        >
          Registrar Empresa
        </Button>
        <Button
          mode='contained'
          onPress={() => router.navigate('/screens/login')}
          icon={'key-variant'}
          contentStyle={{ flexDirection: 'row-reverse' }}
        >
          Iniciar sesión
        </Button>
      </SafeAreaView>
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
