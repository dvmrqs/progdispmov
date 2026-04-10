import { View, Text, StyleSheet } from 'react-native';

export default function DespesaItem({ descricao, valor, data }) {
  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.desc}>{descricao}</Text>
        <Text>{data}</Text>
      </View>
      <Text style={styles.valor}>R$ {valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 15, 
    marginVertical: 8, 
    backgroundColor: '#eee', 
    borderRadius: 8 
  },
  desc: { fontWeight: 'bold', fontSize: 16 },
  valor: { color: '#5e0acc', fontWeight: 'bold' }
});