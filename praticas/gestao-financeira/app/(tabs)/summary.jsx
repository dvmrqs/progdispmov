import { useContext, useMemo } from "react";
import { MoneyContext } from "../../contexts/GlobalState";
import { globalStyles } from "../../styles/globalStyles";
import SummaryItem from "../../components/SummaryItem";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";

export default function Summary() {
  const { transactions, categories } = useContext(MoneyContext);

  const totals = useMemo(() => {
    const map = {};
    let sum = 0;

    for (const tx of transactions) {
      const value = Number(tx.value);
      if (!map[tx.categoryId]) map[tx.categoryId] = 0;
      map[tx.categoryId] += value;

      if (tx.category?.isIncome) {
        sum += value;
      } else {
        sum -= value;
      }
    }

    return { map, sum };
  }, [transactions]);

  const valueStyle = totals.sum > 0 ? globalStyles.positiveText : globalStyles.negativeText;

  return (
    <View style={globalStyles.screenContainer}>
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
            {totals.sum.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  balance: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balanceText: {
    fontSize: 18,
    color: colors.primaryText,
    fontWeight: "800",
  },
});