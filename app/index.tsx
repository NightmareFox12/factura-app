import { Image, StyleSheet } from "react-native";
import { Button, PaperProvider } from "react-native-paper";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View>
            <Image
              style={styles.logo}
              source={{ uri: "https://picsum.photos/700" }}
            />
          </View>

          <Button mode="contained">Registrarse</Button>
          <Button mode="contained">Iniciar sesion</Button>
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 10,
    marginHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
});
