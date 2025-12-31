export const mapStyle = [
  // Remove todos os POIs
  {
    featureType: "poi",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },

  // Remove negócios específicos
  {
    featureType: "poi.business",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },

  // Remove atrações
  {
    featureType: "poi.attraction",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },

  // Remove escolas
  {
    featureType: "poi.school",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },

  // Remove hospitais e clínicas privadas
  {
    featureType: "poi.medical",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },

  // Remove parques
  {
    featureType: "poi.park",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },

  // Remove templos
  {
    featureType: "poi.place_of_worship",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },

  // Remove transporte público
  {
    featureType: "transit",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },

  // Remove ícones padrão
  {
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },

  // Mantém nomes das ruas (opcional)
  {
    featureType: "road",
    elementType: "labels.text",
    stylers: [{ visibility: "on" }],
  },
];
