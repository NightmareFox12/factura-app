import { Button, PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <SafeAreaView>
          <Button mode="contained">Hola bro</Button>
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
