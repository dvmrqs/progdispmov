import { MoneyContext } from "../../contexts/GlobalState";
import { useContext } from "react";
import { ActivityIndicator, FlatList, RefreshControl, Text, View, Alert } from "react-native";
import TransactionItem from "../../components/TransactionItem";
import { globalStyles } from "../../styles/globalStyles";

export default function Transactions() {
  const { transactions, loading, error, refresh, removeTransaction } = useContext(MoneyContext);

  const handleLongPress = (id: string) => {
    Alert.alert("Excluir", "Deseja excluir esta transação?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => removeTransaction(id) },
    ]);
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
      <FlatList
        data={transactions}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TransactionItem {...item} onLongPress={() => handleLongPress(item.id)} />
        )}
        ListEmptyComponent={
          <Text style={globalStyles.secondaryText}>Ainda não há nenhum item!</Text>
        }
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
        style={globalStyles.content}
      />
    </View>
  );
}