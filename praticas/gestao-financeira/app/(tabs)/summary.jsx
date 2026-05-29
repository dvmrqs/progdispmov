import { useContext, useMemo, useState } from "react";
import { MoneyContext } from "../../contexts/GlobalState";
import { globalStyles } from "../../styles/globalStyles";
import SummaryItem from "../../components/SummaryItem";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/colors";

const MONTHS = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

export default function Summary() {
  const { transactions, categories } = useContext(MoneyContext);
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const prevMonth = () => {
    if (selectedMonth === 0) { setSelectedMonth(11); setSelectedYear(y => y - 1); }
    else setSelectedMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (selectedMonth === 11) { setSelectedMonth(0); setSelectedYear(y => y + 1); }
    else setSelectedMonth(m => m + 1);
  };

  const filtered = transactions.filter((tx) => {
    const d = new Date(tx.date);
    return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
  });

  const totals = useMemo(() => {
    const map = {};
    let sum = 0;
    for (const tx of filtered) {
      const value = Number(tx.value);
      if (!map[tx.categoryId]) map[tx.categoryId] = 0;
      map[tx.categoryId] += value;
      if (tx.category?.isIncome) { sum += value; } else { sum -= value; }
    }
    return { map, sum };
  }, [filtered]);

  const valueStyle = totals.sum > 0 ? globalStyles.positiveText : globalStyles.negativeText;

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
      <View style={globalStyles.content}>
        {categories.map((cat) => (
          <SummaryItem
            key={cat.id}
            category={cat.name}
            value={totals.map[cat.id] ?? 0}
          />
        ))}
        <View style={globalStyles.line} />
        <View style={styles.balance}>
          <Text style={styles.balanceText}>Saldo</Text>
          <Text style={valueStyle}>
            {totals.sum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </Text>
        </View>
      </View>
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
  balance: { flexDirection: "row", justifyContent: "space-between" },
  balanceText: { fontSize: 18, color: colors.primaryText, fontWeight: "800" },
});