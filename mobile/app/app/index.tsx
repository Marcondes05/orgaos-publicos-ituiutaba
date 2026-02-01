import "react-native-reanimated";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Linking,
  TextInput,
  ScrollView,
  Keyboard,
  Platform,
  InputAccessoryView,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import {
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { useLocation } from "../hooks/useLocation";
import { API_URL, GOOGLE_MAPS_API_KEY } from "../constants/api";
import { mapStyle } from "../constants/mapStyle";
import CustomMarker from "../components/CustomMarker";

/* ===============================
   TIPOS
=============================== */
type Orgao = {
  id: number;
  nome: string;
  endereco: string;
  latitude: number | string;
  longitude: number | string;
  tipoOrgao?: {
    nome: string;
  };
};

const TIPOS_ORGAO = [
  "Todos",
  "Saúde",
  "Educação",
  "Esporte e Lazer",
  "Administração Pública",
  "Planejamento e Gestão",
  "Assistência Social",
  "Meio Ambiente",
  "Agricultura",
  "Desenvolvimento Econômico e Turismo",
  "Trânsito e Mobilidade",
  "Serviços Públicos",
  "Emergência",
  "Jurídico e Controle",
  "Secretarias",
  "Outros",
];

const inputAccessoryViewID = "keyboard-close";

export default function Home() {
  const { location, errorMsg, loading } = useLocation();
  const insets = useSafeAreaInsets();

  const [orgaos, setOrgaos] = useState<Orgao[]>([]);
  const [orgaoSelecionado, setOrgaoSelecionado] =
    useState<Orgao | null>(null);

  const [textoBusca, setTextoBusca] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState("Todos");

  const [rotaAtiva, setRotaAtiva] = useState(false);
  const rotaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const mapRef = useRef<MapView>(null);
  const snapPoints = useMemo(() => ["45%"], []);

  /* ===============================
     CARREGAR ÓRGÃOS
  =============================== */
  async function carregarOrgaos() {
    try {
      const response = await fetch(`${API_URL}/orgaos`);
      const data = await response.json();
      setOrgaos(Array.isArray(data) ? data : []);
    } catch {
      setOrgaos([]);
    }
  }

  useEffect(() => {
    carregarOrgaos();
  }, []);

  /* ===============================
     FILTRO + BUSCA
  =============================== */
  const orgaosFiltrados = useMemo(() => {
    return orgaos.filter((orgao) => {
      const matchNome = orgao.nome
        .toLowerCase()
        .includes(textoBusca.toLowerCase());

      const matchTipo =
        tipoSelecionado === "Todos" ||
        orgao.tipoOrgao?.nome === tipoSelecionado;

      return matchNome && matchTipo;
    });
  }, [orgaos, textoBusca, tipoSelecionado]);

  /* ===============================
     MAPA / SELEÇÃO
  =============================== */
  function centralizarMapa(orgao: Orgao) {
    if (!mapRef.current) return;

    mapRef.current.animateToRegion(
      {
        latitude: Number(orgao.latitude),
        longitude: Number(orgao.longitude),
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      600
    );
  }

  function abrirDetalhes(orgao: Orgao) {
    if (orgaoSelecionado?.id === orgao.id) {
      fecharDetalhes();
      return;
    }

    if (rotaTimeoutRef.current) {
      clearTimeout(rotaTimeoutRef.current);
    }

    setRotaAtiva(false);
    setOrgaoSelecionado(orgao);
    centralizarMapa(orgao);
    bottomSheetRef.current?.present();

    rotaTimeoutRef.current = setTimeout(() => {
      setRotaAtiva(true);
    }, 2000);
  }

  function fecharDetalhes() {
    if (rotaTimeoutRef.current) {
      clearTimeout(rotaTimeoutRef.current);
    }
    bottomSheetRef.current?.dismiss();
    setOrgaoSelecionado(null);
    setRotaAtiva(false);
  }

  function abrirGoogleMaps() {
    if (!location || !orgaoSelecionado) return;

    const origem = `${location.latitude},${location.longitude}`;
    const destino = `${orgaoSelecionado.latitude},${orgaoSelecionado.longitude}`;

    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&origin=${origem}&destination=${destino}`
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Obtendo localização...</Text>
      </View>
    );
  }

  if (errorMsg || !location) {
    return (
      <View style={styles.center}>
        <Text>Erro ao obter localização</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* 🔍 BUSCA + FILTROS */}
      <View
        style={[
          styles.searchContainer,
          { top: insets.top + 8 },
        ]}
      >
        <TextInput
          placeholder="Buscar órgão..."
          value={textoBusca}
          onChangeText={setTextoBusca}
          returnKeyType="search"
          blurOnSubmit
          clearButtonMode="while-editing"
          inputAccessoryViewID={
            Platform.OS === "ios" ? inputAccessoryViewID : undefined
          }
          style={styles.searchInput}
        />

        {/* 🔽 AUTOCOMPLETE */}
        {textoBusca.length > 0 && (
          <View style={styles.autocomplete}>
            {orgaosFiltrados.map((orgao) => (
              <TouchableOpacity
                key={orgao.id}
                onPress={() => {
                  Keyboard.dismiss();
                  setTextoBusca("");
                  setTipoSelecionado("Todos");
                  abrirDetalhes(orgao);
                }}
                style={styles.autocompleteItem}
              >
                <Text>{orgao.nome}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {TIPOS_ORGAO.map((tipo) => (
            <TouchableOpacity
              key={tipo}
              onPress={() => setTipoSelecionado(tipo)}
              style={[
                styles.filterChip,
                tipoSelecionado === tipo &&
                  styles.filterChipActive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  tipoSelecionado === tipo &&
                    styles.filterTextActive,
                ]}
              >
                {tipo}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 🚦 OVERLAY TRAÇANDO ROTA */}
      {orgaoSelecionado && !rotaAtiva && (
        <View style={styles.routeLoading}>
          <ActivityIndicator size="small" color="#fff" />
          <Text style={styles.routeLoadingText}>
            Traçando rota…
          </Text>
        </View>
      )}

      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        showsUserLocation
        minZoomLevel={11}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {orgaosFiltrados.map((orgao) => (
          <Marker
            key={orgao.id}
            coordinate={{
              latitude: Number(orgao.latitude),
              longitude: Number(orgao.longitude),
            }}
            onPress={() => abrirDetalhes(orgao)}
          >
            <CustomMarker tipo={orgao.tipoOrgao?.nome} />
          </Marker>
        ))}

        {rotaAtiva && orgaoSelecionado && (
          <MapViewDirections
            origin={location}
            destination={{
              latitude: Number(orgaoSelecionado.latitude),
              longitude: Number(orgaoSelecionado.longitude),
            }}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={4}
            strokeColor="#1e88e5"
            onError={() => setRotaAtiva(false)}
          />
        )}
      </MapView>

      {/* 🔑 INPUT ACCESSORY iOS */}
      {Platform.OS === "ios" && (
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <View style={styles.accessory}>
            <TouchableOpacity onPress={Keyboard.dismiss}>
              <Text style={styles.accessoryText}>X</Text>
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
      )}

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onDismiss={fecharDetalhes}
      >
        <BottomSheetView
          style={[
            styles.sheetContent,
            { paddingBottom: insets.bottom + 16 },
          ]}
        >
          {orgaoSelecionado && (
            <>
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>
                  {orgaoSelecionado.nome}
                </Text>
                <TouchableOpacity onPress={fecharDetalhes}>
                  <Ionicons name="close" size={26} />
                </TouchableOpacity>
              </View>

              <Text style={styles.sheetText}>
                📍 {orgaoSelecionado.endereco}
              </Text>

              <TouchableOpacity
                style={styles.routeButton}
                onPress={abrirGoogleMaps}
              >
                <Text style={styles.routeButtonText}>
                  🚗 Abrir no Google Maps
                </Text>
              </TouchableOpacity>
            </>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  );
}

/* ===============================
   STYLES
=============================== */
const styles = StyleSheet.create({
  map: { flex: 1 },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  searchContainer: {
    position: "absolute",
    width: "100%",
    paddingHorizontal: 12,
    zIndex: 10,
  },

  searchInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },

  autocomplete: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
  },

  autocompleteItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  filterChip: {
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },

  filterChipActive: {
    backgroundColor: "#1e88e5",
  },

  filterText: {
    fontSize: 13,
    color: "#333",
  },

  filterTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },

  routeLoading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -80 }, { translateY: -20 }],
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    zIndex: 20,
  },

  routeLoadingText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  accessory: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  accessoryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e88e5",
  },

  sheetContent: {
    padding: 16,
  },

  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  sheetText: {
    marginBottom: 8,
  },

  routeButton: {
    marginTop: 12,
    backgroundColor: "#1e88e5",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  routeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
