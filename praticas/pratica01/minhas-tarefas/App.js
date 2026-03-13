import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { titulo } from './util';
import titulo_default from './util';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{titulo}</Text>
      <Text style = {styles.titulo_text}>{titulo_default}</Text>
      <Button title='Butao'/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo_text: {
    margin: 20,
    color: '#fc0000ff',
    fontSize: 20,
  }
});
