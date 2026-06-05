import { View, ScrollView, Alert, StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import Button from "../../components/Button";
import { useContext, useRef, useState } from "react";
import DescriptionInput from "../../components/DescriptionInput";
import CurrencyInput from "../../components/CurrencyInput";
import DatePicker from "../../components/DatePicker";
import CategoryPicker from "../../components/CategoryPicker";
import { MoneyContext } from "../../contexts/GlobalState";

const initialForm = {
  description: "",
  value: 0,
  date: new Date(),
  categoryId: "",
};

export default function AddTransactions() {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const valueInputRef = useRef();
  const { addTransaction, categories } = useContext(MoneyContext);

  const handleAdd = async () => {
    setSaving(true);
    try {
      await addTransaction({
        description: form.description,
        value: form.value,
        date: form.date,
        categoryId: form.categoryId || categories[0]?.id,
      });
      setForm(initialForm);
      Alert.alert("Sucesso!", "Transação adicionada com sucesso!");
    } catch (e) {
      Alert.alert("Erro", e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView style={globalStyles.screenContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={globalStyles.content}>
          <View style={styles.form}>
            <DescriptionInput form={form} setForm={setForm} valueInputRef={valueInputRef} />
            <CurrencyInput form={form} setForm={setForm} valueInputRef={valueInputRef} />
            <DatePicker form={form} setForm={setForm} />
            <CategoryPicker form={form} setForm={setForm} />
          </View>
          <Button onPress={handleAdd} disabled={saving}>
            {saving ? "Salvando..." : "Adicionar"}
          </Button>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  form: { gap: 12, marginBottom: 40, marginTop: 10 },
});