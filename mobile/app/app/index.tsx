import "react-native-reanimated";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import {
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { useLocation } from "../hooks/useLocation";
import { API_URL, GOOGLE_MAPS_API_KEY } from "../constants/api";
import { mapStyle } from "../constants/mapStyle";

type Orgao = {
  id: number;
  nome: string;
  endereco: string;
  telefone?: string;
  email?: string;
  horarioAbertura?: string;
  horarioFechamento?: string;
  latitude: number | string;
  longitude: number | string;
};

export default function Home() {
  const { location, errorMsg, loading } = useLocation();
  const [orgaos, setOrgaos] = useState<Orgao[]>([]);
  const [orgaoSelecionado, setOrgaoSelecionado] =
    useState<Orgao | null>(null);

  const [mostrarRota, setMostrarRota] = useState(false);

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const mapRef = useRef<MapView>(null);
  const snapPoints = useMemo(() => ["45%", "70%"], []);

  async function carregarOrgaos() {
    try {
      const response = await fetch(`${API_URL}/orgaos`);
      const data = await response.json();
      setOrgaos(data);
    } catch {
      // silencioso para MVP
    }
  }

  useEffect(() => {
    carregarOrgaos();
  }, []);

  function abrirDetalhes(orgao: Orgao) {
    setOrgaoSelecionado(orgao);
    setMostrarRota(false);
    bottomSheetRef.current?.present();
  }

  function mostrarRotaNoMapa() {
    setMostrarRota(true);
  }

  function abrirGoogleMaps() {
    if (!location || !orgaoSelecionado) return;

    const origem = `${location.latitude},${location.longitude}`;
    const destino = `${orgaoSelecionado.latitude},${orgaoSelecionado.longitude}`;

    const url = `https://www.google.com/maps/dir/?api=1&origin=${origem}&destination=${destino}&travelmode=driving`;
    Linking.openURL(url);
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
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        showsUserLocation
        showsPointsOfInterest={false}
        showsBuildings={false}
        minZoomLevel={14}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {orgaos.map((orgao) => (
          <Marker
            key={orgao.id}
            coordinate={{
              latitude: Number(orgao.latitude),
              longitude: Number(orgao.longitude),
            }}
            onPress={() => abrirDetalhes(orgao)}
          />
        ))}

        {mostrarRota && orgaoSelecionado && location && (
          <MapViewDirections
            origin={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            destination={{
              latitude: Number(orgaoSelecionado.latitude),
              longitude: Number(orgaoSelecionado.longitude),
            }}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={4}
            strokeColor="#1e88e5"
            onReady={(result) => {
              mapRef.current?.fitToCoordinates(
                result.coordinates,
                {
                  edgePadding: {
                    top: 100,
                    bottom: 300,
                    left: 50,
                    right: 50,
                  },
                  animated: true,
                }
              );
            }}
          />
        )}
      </MapView>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onDismiss={() => setMostrarRota(false)}
      >
        <BottomSheetView style={styles.sheetContent}>
          {orgaoSelecionado && (
            <>
              <Text style={styles.sheetTitle}>
                {orgaoSelecionado.nome}
              </Text>

              <Text style={styles.sheetText}>
                📍 {orgaoSelecionado.endereco}
              </Text>

              {orgaoSelecionado.telefone && (
                <Text style={styles.sheetText}>
                  ☎️ {orgaoSelecionado.telefone}
                </Text>
              )}

              {orgaoSelecionado.email && (
                <Text style={styles.sheetText}>
                  ✉️ {orgaoSelecionado.email}
                </Text>
              )}

              <Text style={styles.sheetText}>
                ⏰ Horário:{" "}
                {orgaoSelecionado.horarioAbertura &&
                orgaoSelecionado.horarioFechamento
                  ? `${orgaoSelecionado.horarioAbertura} - ${orgaoSelecionado.horarioFechamento}`
                  : "Não informado"}
              </Text>

              <TouchableOpacity
                style={styles.routeButton}
                onPress={mostrarRotaNoMapa}
              >
                <Text style={styles.routeButtonText}>
                  🧭 Mostrar rota no mapa
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.routeButton, { backgroundColor: "#444" }]}
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
    </View>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sheetContent: { padding: 16 },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sheetText: {
    fontSize: 15,
    marginBottom: 6,
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
    fontSize: 15,
    fontWeight: "bold",
  },
});
