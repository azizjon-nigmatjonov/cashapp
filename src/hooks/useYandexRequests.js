import { useQuery } from "react-query";
import { getAddressListYandex, getGeoCodeAddressList } from "services/yandex";

const useYandexRequests = ({ geocoderProps, addressListProps, text = "" }) => {
  const fetchGeocoderAddressList = () => {
    return getGeoCodeAddressList(text);
  };

  const fetchAddressListYandex = () => {
    return getAddressListYandex({ text });
  };

  const geocoder = useQuery(["geocoder", text], fetchGeocoderAddressList, {
    ...geocoderProps,
    select: (res) => {
      return res?.data?.response?.GeoObjectCollection?.featureMember?.map(
        (item) => ({
          label: item?.GeoObject?.name,
          description: item?.GeoObject?.description,
          location: item?.GeoObject?.Point,
        }),
      );
    },
  });

  const addressList = useQuery(["addressList", text], fetchAddressListYandex, {
    ...addressListProps,
    select: (res) => {
      return res?.data?.features?.map((item) => ({
        label: item?.properties?.name,
        description: item?.properties?.description,
        location: {
          pos: `${item?.geometry?.coordinates[0]} ${item?.geometry?.coordinates[1]}`,
        },
      }));
    },
  });

  return {
    geocoder: geocoder,
    addressLists: addressList,
  };
};

export default useYandexRequests;
