import { MoneyContext } from "../../contexts/GlobalState";
import { useContext, useState, useEffect } from "react";
import {
  ActivityIndicator, FlatList, RefreshControl,
  Text, View, Alert, StyleSheet, TouchableOpacity
} from "react-native";
import TransactionItem from "../../components/TransactionItem";
import { globalStyles } from "../../styles/globalStyles";
import { colors } from "../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const MONTHS = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

export default function Transactions() {
  const { transactions, loading, error, refresh, removeTransaction } = useContext(MoneyContext);
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [userName, setUserName] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("loggedUser").then((data) => {
      if (data) setUserName(JSON.parse(data).name);
    });
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("loggedUser");
    router.replace("/login" as any);
  };

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
      {userName ? (
        <View style={styles.welcomeRow}>
          <Text style={styles.welcome}>Olá, {userName}! 👋</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logout}>Sair</Text>
          </TouchableOpacity>
        </View>
      ) : null}
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
  welcomeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  welcome: {
    fontSize: 15,
    color: colors.primaryText,
    fontWeight: "600",
  },
  logout: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
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