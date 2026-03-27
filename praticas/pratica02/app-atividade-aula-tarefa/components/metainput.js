import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { rotulo_btn_cadastro_meta, rotulo_input_meta } from '../mensagens';

function MetaInput(props) {
  const [inputMetaText, setInputMetaText] = useState('');

  function metaInputHandler(inputText) {
    setInputMetaText(inputText);
  }

  function addMetaHandler() {
    if (inputMetaText.trim().length === 0) return;
    props.onAddMeta(inputMetaText);
    setInputMetaText(''); 
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder={rotulo_input_meta}
        onChangeText={metaInputHandler}
        value={inputMetaText}
      />
      <Button title={rotulo_btn_cadastro_meta} onPress={addMetaHandler} />
    </View>
  );
}

export default MetaInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 8,
  },
});