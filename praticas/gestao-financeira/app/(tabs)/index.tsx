import { MoneyContext } from "../../contexts/GlobalState";
import { useContext, useState } from "react";
import {
  ActivityIndicator, FlatList, RefreshControl,
  Text, View, Alert, StyleSheet, TouchableOpacity
} from "react-native";
import TransactionItem from "../../components/TransactionItem";
import { globalStyles } from "../../styles/globalStyles";
import { colors } from "../../constants/colors";

const MONTHS = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

export default function Transactions() {
  const { transactions, loading, error, refresh, removeTransaction } = useContext(MoneyContext);
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const filtered = transactions.filter((tx: any) => {
    const d = new Date(tx.date);
    return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
  });

  const handleLongPress = (id: string) => {
    Alert.alert("Excluir", "Deseja excluir esta transação?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => removeTransaction(id) },
    ]);
  };

  const prevMonth = () => {
    if (selectedMonth === 0) { setSelectedMonth(11); setSelectedYear(y => y - 1); }
    else setSelectedMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (selectedMonth === 11) { setSelectedMonth(0); setSelectedYear(y => y + 1); }
    else setSelectedMonth(m => m + 1);
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
  if (error) return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.secondaryText}>{error}</Text>
      <Text onPress={refresh} style={globalStyles.secondaryText}>Tentar novamente</Text>
    </View>
  );

  return (
    <View style={globalStyles.screenContainer}>
      <View style={styles.filterRow}>
        <TouchableOpacity onPress={prevMonth} style={styles.arrow}>
          <Text style={styles.arrowText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.monthLabel}>{MONTHS[selectedMonth]} {selectedYear}</Text>
        <TouchableOpacity onPress={nextMonth} style={styles.arrow}>
          <Text style={styles.arrowText}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TransactionItem {...item} onLongPress={() => handleLongPress(item.id)} />
        )}
        ListEmptyComponent={
          <Text style={globalStyles.secondaryText}>Nenhuma transação neste mês!</Text>
        }
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
        style={globalStyles.content}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.background,
  },
  arrow: { padding: 8 },
  arrowText: { fontSize: 20, color: colors.primary, fontWeight: "bold" },
  monthLabel: { fontSize: 16, fontWeight: "700", color: colors.primaryText },
});