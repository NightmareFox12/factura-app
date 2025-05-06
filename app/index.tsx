import { Image, StyleSheet, View } from "react-native";
import { Button, PaperProvider, Text } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.containerLogo}>
            <Image
              style={styles.logo}
              source={{ uri: "https://picsum.photos/700" }}
            />
          </View>

          <Text variant="headlineSmall" style={{ textAlign: "center" }}>
            Factura App
          </Text>

          <Button mode="contained">Registrarse</Button>
          <Button mode="contained">Iniciar sesión</Button>
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 16,
    marginHorizontal: 20,
  },
  containerLogo: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 200,
  },
});
