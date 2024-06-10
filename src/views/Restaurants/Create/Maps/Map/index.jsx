import { useEffect, useRef, useState } from "react";
import {
  YMaps,
  Map,
  Placemark,
  ZoomControl,
  SearchControl,
  GeolocationControl,
  FullscreenControl,
  TrafficControl,
  TypeSelector,
} from "@pbe/react-yandex-maps";
import { CircularProgress } from "@mui/material";
import cls from "./style.module.scss";
// import { apikey } from "../../../../../constants/mapDefaults";

export default function MapRestaurant({
  branch = [],
  placemarkGeometry,
  setPlacemarkGeometry,
}) {
  const mapRef = useRef(null);
  const [ymaps, setYmaps] = useState("");
  const [mapLoading, setMapLoading] = useState(false);

  const getAddress = (coords) => {
    ymaps.geocode(coords).then(function (res) {
      const firstGeoObject = res?.geoObjects?.get(0);
      setPlacemarkGeometry({
        name: firstGeoObject?.getAddressLine(),
        location: coords,
      });
      // console.log("firstGeoObject", firstGeoObject?.getAddressLine());
    });
  };

  const onMapClick = (e) => {
    const coords = e.get("coords");
    getAddress(coords);
  };

  const setPoisition = (position, address) => {
    mapRef.current?.setCenter(position, undefined, {
      duration: 300,
    });
    address && getAddress(position);
  };

  const onLocationChange = (event) => {
    var position = event.get("position");
    setPoisition(position, "address");
  };

  useEffect(() => {
    if (
      placemarkGeometry?.location?.[0] &&
      placemarkGeometry?.location?.[1] &&
      mapRef.current
    ) {
      setMapLoading(true);
      mapRef.current?.setCenter(placemarkGeometry?.location, undefined, {
        duration: 300,
      });
      setTimeout(() => {
        setMapLoading(false);
      }, 300);
    }
  }, [placemarkGeometry]);

  useEffect(() => {
    if (branch?.id && ymaps) {
      const position = [branch.lat, branch.long];
      getAddress(position);
    }
  }, [branch, ymaps]);

  return (
    <div style={{ marginTop: "25px", position: "relative" }}>
      {mapLoading && (
        <div className={cls.mapLoader}>
          <CircularProgress size={40} style={{ color: "#d95c35" }} />
        </div>
      )}
      <YMaps query={{ apikey: "ca8cf0be-47cc-4aae-8d31-e392494e78ca" }}>
        <div>
          <Map
            onClick={onMapClick}
            width="100%"
            height="500px"
            modules={["Placemark", "geocode"]}
            onLoad={(ymaps) => setYmaps(ymaps)}
            defaultState={{
              center:
                placemarkGeometry?.location?.[0] &&
                placemarkGeometry?.location?.[1]
                  ? placemarkGeometry.location
                  : [41.292906, 69.24132],
              zoom: 13,
            }}
            instanceRef={mapRef}
          >
            <ZoomControl /> <SearchControl options={{ size: "large" }} />{" "}
            <GeolocationControl
              options={{ noPlacemark: true }}
              onLocationChange={onLocationChange}
            />
            <FullscreenControl />
            <TrafficControl />
            <TypeSelector />
            {placemarkGeometry?.location?.[0] &&
              placemarkGeometry?.location?.[1] && (
                <Placemark geometry={placemarkGeometry.location} />
              )}
            {branch?.id && (
              <Placemark
                key={branch?.id ?? 1}
                properties={{
                  iconContent: `${branch?.name}`,
                }}
                options={{
                  preset: "islands#greenStretchyIcon",
                  zIndex: "99999",
                }}
                geometry={[branch?.lat, branch?.long]}
              />
            )}
          </Map>
        </div>
      </YMaps>
    </div>
  );
}
