import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MetaInput from './components/metainput';
import MetaList from './components/metalist';
import { rotulo_lista_meta } from './mensagens';

export default function App() {
  const [metas, setMetas] = useState([]);

  useEffect(() => {
    async function carregarMetas() {
      try {
        const dados = await AsyncStorage.getItem('listaMetas');
        if (dados !== null) {
          setMetas(JSON.parse(dados));
        }
      } catch (e) {
        console.log("Erro ao carregar dados");
      }
    }
    carregarMetas();
  }, []);

  useEffect(() => {
    async function salvarMetas() {
      try {
        await AsyncStorage.setItem('listaMetas', JSON.stringify(metas));
      } catch (e) {
        console.log("Erro ao salvar dados");
      }
    }
    salvarMetas();
  }, [metas]);

  function adicionarMetaHandler(textoDigitado) {
    setMetas((metasAtuais) => [
      ...metasAtuais,
      { id: Math.random().toString(), text: textoDigitado },
    ]);
  }

  function deletarMetaHandler(id) {
    setMetas((metasAtuais) => {
      return metasAtuais.filter((meta) => meta.id !== id);
    });
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputSection}>
        <MetaInput onAddMeta={adicionarMetaHandler} />
      </View>
      
      <Text style={styles.titulo}>{rotulo_lista_meta}</Text>
      
      <View style={styles.listSection}>
        <MetaList array={metas} onDeleteItem={deletarMetaHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  inputSection: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  listSection: {
    flex: 5,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10
  }
});