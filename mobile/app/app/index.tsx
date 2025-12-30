import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { API_URL } from "../constants/api";

type Orgao = {
  id: number;
  nome: string;
  endereco: string;
};

export default function Home() {
  const [orgaos, setOrgaos] = useState<Orgao[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarOrgaos() {
    try {
      const response = await fetch(`${API_URL}/orgaos`);
      const data = await response.json();
      setOrgaos(data);
    } catch (error) {
      setErro("Erro ao carregar órgãos públicos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarOrgaos();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{erro}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>
        Órgãos Públicos
      </Text>

      <FlatList
        data={orgaos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 12,
              borderBottomWidth: 1,
              borderColor: "#ccc",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{item.nome}</Text>
            <Text>{item.endereco}</Text>
          </View>
        )}
      />
    </View>
  );
}
