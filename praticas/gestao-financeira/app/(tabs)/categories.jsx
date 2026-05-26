import { useContext, useState } from "react";
import {
  View, Text, FlatList, TextInput, StyleSheet,
  Alert, TouchableOpacity, ActivityIndicator
} from "react-native";
import { MoneyContext } from "../../contexts/GlobalState";
import { globalStyles } from "../../styles/globalStyles";
import { colors } from "../../constants/colors";

const SUGGESTED_COLORS = [
  "#DE9AC3", "#DEA17B", "#E6E088", "#AB8FBE",
  "#82C9DE", "#FFB6B6", "#B6FFB6", "#B6D4FF",
];

const initialForm = {
  name: "",
  displayName: "",
  icon: "star",
  background: "#DEA17B",
  isIncome: false,
};

export default function Categories() {
  const { categories, addCategory, removeCategory } = useContext(MoneyContext);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  const handleCreate = async () => {
    if (!form.name || !form.displayName) {
      Alert.alert("Erro", "Preencha o nome e o rótulo da categoria.");
      return;
    }
    setSaving(true);
    try {
      await addCategory(form);
      setForm(initialForm);
      Alert.alert("Sucesso!", "Categoria criada com sucesso!");
    } catch (e) {
      Alert.alert("Erro", e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id, isDefault) => {
    if (isDefault) {
      Alert.alert("Atenção", "Categorias padrão não podem ser excluídas.");
      return;
    }
    Alert.alert("Excluir", "Deseja excluir esta categoria?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => removeCategory(id) },
    ]);
  };

  return (
    <View style={globalStyles.screenContainer}>
      <FlatList
        style={globalStyles.content}
        data={categories}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.form}>
            <Text style={globalStyles.inputLabel}>Nome técnico (ex: health)</Text>
            <TextInput
              style={globalStyles.input}
              value={form.name}
              onChangeText={(t) => setForm({ ...form, name: t })}
              placeholder="health"
              autoCapitalize="none"
            />
            <Text style={globalStyles.inputLabel}>Rótulo (ex: Saúde)</Text>
            <TextInput
              style={globalStyles.input}
              value={form.displayName}
              onChangeText={(t) => setForm({ ...form, displayName: t })}
              placeholder="Saúde"
            />
            <Text style={globalStyles.inputLabel}>Ícone (nome Material Icon)</Text>
            <TextInput
              style={globalStyles.input}
              value={form.icon}
              onChangeText={(t) => setForm({ ...form, icon: t })}
              placeholder="favorite"
              autoCapitalize="none"
            />
            <Text style={globalStyles.inputLabel}>Cor</Text>
            <View style={styles.colorRow}>
              {SUGGESTED_COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[styles.colorDot, { backgroundColor: color },
                    form.background === color && styles.colorDotSelected]}
                  onPress={() => setForm({ ...form, background: color })}
                />
              ))}
            </View>
            <TouchableOpacity
              style={[styles.isIncomeBtn, form.isIncome && styles.isIncomeBtnActive]}
              onPress={() => setForm({ ...form, isIncome: !form.isIncome })}
            >
              <Text style={{ color: form.isIncome ? colors.primaryContrast : colors.primaryText }}>
                {form.isIncome ? "✓ É uma receita" : "É uma receita?"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createBtn} onPress={handleCreate} disabled={saving}>
              <Text style={styles.createBtnText}>{saving ? "Salvando..." : "Criar Categoria"}</Text>
            </TouchableOpacity>
            <Text style={[globalStyles.inputLabel, { marginTop: 20 }]}>Categorias existentes</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryRow}
            onLongPress={() => handleDelete(item.id, item.isDefault)}
          >
            <View style={[styles.categoryIcon, { backgroundColor: item.background }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.categoryName}>{item.displayName}</Text>
              <Text style={styles.categoryMeta}>
                {item.isDefault ? "padrão" : "personalizada"}{item.isIncome ? " · receita" : ""}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: 8, marginBottom: 16 },
  colorRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  colorDot: { width: 32, height: 32, borderRadius: 16 },
  colorDotSelected: { borderWidth: 3, borderColor: colors.primary },
  isIncomeBtn: {
    padding: 10, borderRadius: 8, borderWidth: 1,
    borderColor: colors.secondaryText, alignItems: "center",
  },
  isIncomeBtnActive: { backgroundColor: colors.primary },
  createBtn: {
    backgroundColor: colors.primary, padding: 12,
    borderRadius: 8, alignItems: "center",
  },
  createBtnText: { color: colors.primaryContrast, fontWeight: "700" },
  categoryRow: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingVertical: 10, borderBottomWidth: 1, borderColor: colors.line,
  },
  categoryIcon: { width: 36, height: 36, borderRadius: 18 },
  categoryName: { fontSize: 15, color: colors.primaryText },
  categoryMeta: { fontSize: 12, color: colors.secondaryText },
});