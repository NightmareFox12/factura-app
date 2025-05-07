import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

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
import { Image } from 'expo-image';
export default function CompanyScreen() {
  const router = useRouter();
  const theme = useTheme();

  //states
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);

  const [companyName, setCompanyName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // const handleUploadLogo = async () => {
  //   DocumentPicker.getDocumentAsync({
  //     type: 'image/*',
  //     multiple: false
  //   })
  // }

  const handleUploadLogo = async () => {
    let res: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
        allowsMultipleSelection: false,
      });

    console.log(res);
    res.assets !== null && setCompanyLogo(res.assets[0].uri);
  };

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
                {companyLogo === null
                  ? 'Cargar Logo de la empresa'
                  : 'Cambiar Logo de la empresa'}
              </Text>

              {companyLogo === null ? (
                <IconButton
                  icon={'folder'}
                  onPress={handleUploadLogo}
                  containerColor={theme.colors.primary}
                  size={30}
                  style={styles.iconButton}
                />
              ) : (
                <Button
                  mode='outlined'
                  onPress={handleUploadLogo}
                  style={styles.buttonLogo}
                >
                  <Image
                    source={{ uri: companyLogo }}
                    contentFit='cover'
                    style={styles.logo}
                  />
                </Button>
              )}

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
  buttonLogo: {
    // borderWidth: 0,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 10,
    padding: 0,
    margin: 0,
  },
  buttonSend: {
    marginTop: 30,
    marginHorizontal: 20,
  },
});
