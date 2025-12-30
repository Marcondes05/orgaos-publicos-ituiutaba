import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: -18.9707,
  lng: -49.4652, // Ituiutaba
};

function MapPicker({ enderecoCompleto, onLocationChange }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [position, setPosition] = useState(defaultCenter);
  const [map, setMap] = useState(null);

  // Buscar endereço quando mudar
  useEffect(() => {
    if (!enderecoCompleto || !map || !window.google) return;

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: enderecoCompleto }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();

        const newPos = { lat, lng };
        setPosition(newPos);
        map.panTo(newPos);
        onLocationChange(lat, lng);
      }
    });
  }, [enderecoCompleto, map]);

  function handleDragEnd(event) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setPosition({ lat, lng });
    onLocationChange(lat, lng);
  }

  if (!isLoaded) return <p>Carregando mapa...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={position}
      zoom={15}
      onLoad={(mapInstance) => setMap(mapInstance)}
    >
      <Marker
        position={position}
        draggable
        onDragEnd={handleDragEnd}
      />
    </GoogleMap>
  );
}

export default MapPicker;
