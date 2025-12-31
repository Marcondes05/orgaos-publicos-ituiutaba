import { View, Text, Button, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Detalhes() {
  const { nome, endereco } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{nome}</Text>
      <Text style={styles.text}>{endereco}</Text>

      <Button title="Traçar rota" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
});
