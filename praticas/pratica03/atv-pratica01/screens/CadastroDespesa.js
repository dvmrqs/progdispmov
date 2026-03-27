import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CadastroDespesa({ navigation }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  async function salvarDespesa() {
    if (!descricao || !valor) return;

    const novaDespesa = {
      id: Math.random().toString(),
      descricao,
      valor: parseFloat(valor).toFixed(2), // Aula 08: toFixed(2)
      data: data.toLocaleDateString('pt-BR'),
    };

    const existentes = await AsyncStorage.getItem('listaDespesas');
    const listaAtualizada = existentes ? JSON.parse(existentes) : [];
    listaAtualizada.push(novaDespesa);

    await AsyncStorage.setItem('listaDespesas', JSON.stringify(listaAtualizada));
    navigation.goBack(); // Aula 07: goBack
  }

  return (
    <View style={styles.form}>
      <Text>Descrição:</Text>
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} />

      <Text>Valor (R$):</Text>
      <TextInput style={styles.input} value={valor} onChangeText={setValor} keyboardType="decimal-pad" />

      <Text>Data:</Text>
      <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
        <Text>{data.toLocaleDateString('pt-BR')}</Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={data}
          mode="date"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setData(selectedDate);
          }}
        />
      )}

      <Button title="Salvar Despesa" onPress={salvarDespesa} color="#5e0acc" />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 20, padding: 8, borderColor: '#ccc' }
});