import { useEffect } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  //functions

  //effects
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text
          variant='labelSmall'
          style={{ color: 'white', textAlign: 'center' }}
        >
          afhjjjjjjjjjjjjfahfjafhfjah
        </Text>
        {/* <Button mode='contained-tonal'>Hola</Button> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
