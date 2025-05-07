import { StyleSheet } from 'react-native';
import { Button, Drawer, Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* <Drawer.Section showDivider={false} style={{ width: 200 }}>
          <Drawer.Item label='cafe sin lechuga' active={true} />
          <Drawer.Item label='cafe sin lechuga' active={true} />
          <Drawer.Item label='cafe sin lechuga' active={true} />
          <Drawer.Item label='cafe sin lechuga' active={true} />
          <Drawer.Item label='cafe sin lechuga' active={true} />
          <Drawer.Item label='cafe sin lechuga' active={true} />
          <Drawer.Item label='cafe sin lechuga' active={true} />
          <Drawer.Item label='cafe sin lechuga' active={true} />
          <Drawer.Item label='cafe sin lechuga' active={true} />
          <Drawer.Item label='cafe sin lechuga' active={true} />
          <Drawer.Item label='cafe sin lechuga' active={true} />
        </Drawer.Section> */}

        <Text>afhfahfjafhfjah</Text>
        <Button mode='contained-tonal'>Hola</Button>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  
});
