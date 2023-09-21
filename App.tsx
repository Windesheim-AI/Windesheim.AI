import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const backgroundColorDefault = '#fff';
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: backgroundColorDefault,
    flex: 1,
    justifyContent: 'center',
  },
});
