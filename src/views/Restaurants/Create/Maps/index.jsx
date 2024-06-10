import { useEffect, useMemo, useState } from "react";
import MapSearchFields from "./Search";
import MapRestaurant from "./Map";
import useYandexRequests from "../../../../hooks/useYandexRequests";
import "./style.scss";

export default function RestaurantMapWrapper({
  errors,
  setValue = () => {},
  branch,
}) {
  const [searchAddress, setSearchAddress] = useState("");
  const [placemarkGeometry, setPlacemarkGeometry] = useState({});
  const [customerAddresses, setCustomerAddresses] = useState([]);

  const { addressLists, geocoder } = useYandexRequests({
    geocoderProps: {
      enabled: Boolean(searchAddress),
    },
    addressListProps: {
      enabled: Boolean(searchAddress),
    },
    text: searchAddress,
  });

  const fetchSearchAddress = () => {
    if (geocoder.isSuccess)
      setCustomerAddresses([
        {
          label: "searched-address",
          value: "searched-address",
          options: [...geocoder?.data],
        },
      ]);

    if (customerAddresses?.[0] && addressLists.isSuccess) {
      setCustomerAddresses((prev) => [
        {
          ...prev[0],
          options: [...prev[0]?.options, ...addressLists?.data],
        },
      ]);
    }
  };

  useEffect(() => {
    if (searchAddress?.length) {
      fetchSearchAddress();
    } else setCustomerAddresses([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchAddress, geocoder?.data, addressLists?.data]);

  useEffect(() => {
    if (
      placemarkGeometry?.name &&
      placemarkGeometry.location[0] &&
      placemarkGeometry.location[1]
    ) {
      setValue("lat", placemarkGeometry.location[0]);
      setValue("long", placemarkGeometry.location[1]);
    }
  }, [placemarkGeometry, setValue]);
  return (
    <div className="RestaurantMap">
      <div>
        <MapSearchFields
          errors={errors}
          searchAddress={searchAddress}
          setSearchAddress={setSearchAddress}
          customerAddresses={customerAddresses}
          setCustomerAddresses={setCustomerAddresses}
          placemarkGeometry={placemarkGeometry}
          setPlacemarkGeometry={setPlacemarkGeometry}
        />
      </div>

      <div>
        <MapRestaurant
          branch={branch}
          placemarkGeometry={placemarkGeometry}
          setPlacemarkGeometry={setPlacemarkGeometry}
        />
      </div>
    </div>
  );
}
