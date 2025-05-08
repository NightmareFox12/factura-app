import { View, StyleSheet } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { invoiceTemplate } from '@/templates/invoiceTemplate';
import { Button } from 'react-native-paper';

export default function App() {
  // const [selectedPrinter, setSelectedPrinter] = useState();

  const print = async () => {
    await Print.printAsync({
      html: invoiceTemplate,
    });
  };

  const printToFile = async () => {
    const { uri } = await Print.printToFileAsync({ html: invoiceTemplate });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  // const selectPrinter = async () => {
  // const printer = await Print.selectPrinterAsync();
  // setSelectedPrinter(printer);
  // };

  return (
    <View style={styles.container}>
      <Button mode='contained' style={styles.button} onPress={print}>
        Descargar PDF
      </Button>

      <Button mode='contained' style={styles.button} onPress={printToFile}>
        Compartir PDF
      </Button>

      {/* {Platform.OS === 'ios' && (
        <Button onPress={print} onPress={selectPrinter}>
          Seleccionar impresion{' '}
        </Button>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
  },
  button: {
    marginHorizontal: 10,
  },
});
