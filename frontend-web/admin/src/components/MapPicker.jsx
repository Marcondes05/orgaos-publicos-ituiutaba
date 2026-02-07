import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "8px",
};

const defaultCenter = {
  lat: -18.9707,
  lng: -49.4652, // Ituiutaba
};

function MapPicker({
  enderecoCompleto,
  latitude,
  longitude,
  onLocationChange,
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
  const [enderecoConfirmado, setEnderecoConfirmado] = useState("");

  /* ===============================
     CARREGA COORDENADAS AO EDITAR
  =============================== */
  useEffect(() => {
    if (latitude && longitude) {
      setCenter({ lat: latitude, lng: longitude });
    }
  }, [latitude, longitude]);

  /* ===============================
     BUSCA POR ENDEREÇO (CEP)
  =============================== */
  useEffect(() => {
    if (!enderecoCompleto || !map || !window.google) return;

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: enderecoCompleto }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();

        const newCenter = { lat, lng };
        setCenter(newCenter);
        map.panTo(newCenter);
        setEnderecoConfirmado("");
      }
    });
  }, [enderecoCompleto, map]);

  /* ===============================
     CONFIRMAR LOCALIZAÇÃO
  =============================== */
  function confirmarLocalizacao() {
    if (!map || !window.google) return;

    const mapCenter = map.getCenter();
    const lat = mapCenter.lat();
    const lng = mapCenter.lng();

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode(
      { location: { lat, lng } },
      (results, status) => {
        if (status === "OK" && results[0]) {
          const enderecoFormatado =
            results[0].formatted_address;

          setEnderecoConfirmado(enderecoFormatado);

          // 🔥 ENVIA TUDO PARA O FORMULÁRIO
          onLocationChange(lat, lng, enderecoFormatado);
        }
      }
    );
  }

  if (!isLoaded) return <p>Carregando mapa...</p>;

  return (
    <div style={{ position: "relative" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={(mapInstance) => setMap(mapInstance)}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
        }}
      />

      {/* 📍 PIN FIXO PADRÃO GOOGLE */}
      <img
        src="https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png"
        alt="Pin"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -100%)",
          pointerEvents: "none",
          width: "30px",
          height: "45px",
        }}
      />

      {/* BOTÃO CONFIRMAR */}
      <div style={{ marginTop: "12px" }}>
        <button type="button" onClick={confirmarLocalizacao}>
          Confirmar localização
        </button>
      </div>

      {/* ENDEREÇO CONFIRMADO */}
      {enderecoConfirmado && (
        <p
          style={{
            marginTop: "8px",
            fontSize: "14px",
            color: "#333",
          }}
        >
          📍 <strong>Endereço confirmado:</strong>
          <br />
          {enderecoConfirmado}
        </p>
      )}
    </div>
  );
}

export default MapPicker;
