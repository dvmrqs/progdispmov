import { StyleSheet, Text, ScrollView, View, Pressable } from "react-native";

function MetaList(props) {
  return (
    <ScrollView>
      {props.array.map((meta) => (
        <View key={meta.id} style={styles.metaItem}>
          <Pressable
            android_ripple={{ color: '#210644' }}
            onPress={() => props.onDeleteItem(meta.id)}
            style={({ pressed }) => pressed && styles.pressedItem}
          >
            <Text style={styles.metaText}>{meta.text}</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

export default MetaList;

const styles = StyleSheet.create({
  metaItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: '#0acc4bff',
  },
  pressedItem: {
    opacity: 0.5,
  },
  metaText: {
    color: 'white',
    padding: 10,
  },
});