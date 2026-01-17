import { View, Image, StyleSheet } from "react-native";
import { markerColors } from "../constants/markerColors";
import { markerIcons } from "../constants/markerIcons";

type Props = {
  tipo?: string;
};

export default function CustomMarker({ tipo }: Props) {
  const cor = markerColors[tipo || "Outros"] || markerColors["Outros"];
  const icone = markerIcons[tipo || "Outros"];

  return (
    <View style={styles.container}>
      <View style={[styles.pin, { backgroundColor: cor }]}>
        <Image source={icone} style={styles.icon} />
      </View>

      <View style={[styles.arrow, { borderTopColor: cor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  pin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },

  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
});
