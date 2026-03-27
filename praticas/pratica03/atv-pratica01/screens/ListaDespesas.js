import { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DespesaItem from '../components/DespesaItem';

export default function ListaDespesas({ navigation }) {
  const [despesas, setDespesas] = useState([]);

  // Carrega dados ao focar na tela (importante para atualização após cadastro)
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarDados();
    });
    return unsubscribe;
  }, [navigation]);

  async function carregarDados() {
    const dados = await AsyncStorage.getItem('listaDespesas');
    if (dados) setDespesas(JSON.parse(dados));
  }

  return (
    <View style={styles.container}>
      <Button 
        title="Adicionar Nova Despesa" 
        onPress={() => navigation.navigate('CadastroDespesa')} 
        color="#5e0acc"
      />
      <FlatList
        data={despesas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DespesaItem descricao={item.descricao} valor={item.valor} data={item.data} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 }
});