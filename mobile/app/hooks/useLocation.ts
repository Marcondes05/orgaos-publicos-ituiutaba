import * as Location from "expo-location";
import { useEffect, useState } from "react";

export type UserLocation = {
  latitude: number;
  longitude: number;
};

export function useLocation() {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permissão de localização negada");
        setLoading(false);
        return;
      }

      const currentLocation =
        await Location.getCurrentPositionAsync({});

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      setLoading(false);
    })();
  }, []);

  return { location, errorMsg, loading };
}
