import { useEffect, useMemo, useRef, useState } from "react";
import CTextField from "../../../../../components/CElements/CTextField";
import useDebounce from "../../../../../hooks/useDebounce";
import SearchDropdown from "./SearchDropdown";
import cls from "./style.module.scss";
import CLabel from "../../../../../components/CElements/CLabel";
import CError from "../../../../../components/CElements/CError";
export default function MapSearchFields({
  errors,
  customerAddresses,
  placemarkGeometry = {},
  setSearchAddress = () => {},
  setPlacemarkGeometry = () => {},
}) {
  const [defaultValue, setdefaultValue] = useState("");
  const handleChangeSearch = useDebounce((search) => {
    setSearchAddress(search);
  }, 500);

  useEffect(() => {
    setdefaultValue("");
    if (placemarkGeometry?.name) {
      setTimeout(() => {
        setdefaultValue(placemarkGeometry?.name);
      }, 500);
    }
  }, [placemarkGeometry]);

  return (
    <div className="textfield" style={{ position: "relative" }}>
      <CLabel title="Карта" required={true} />
      <div style={{ position: "relative" }}>
        {defaultValue?.length ? (
          <input
            onChange={(e) => {
              handleChangeSearch(e.target.value);
            }}
            type="text"
            defaultValue={defaultValue}
            placeholder="Адрес..."
            className={cls.input}
          />
        ) : (
          <CTextField
            onChange={(e) => {
              handleChangeSearch(e);
            }}
            placeholder="Адрес..."
            errors={errors}
          />
        )}
        <CError errors={errors} name="lat" />
      </div>

      <SearchDropdown
        options={customerAddresses[0]?.options}
        setSearchAddress={setSearchAddress}
        setPlacemarkGeometry={setPlacemarkGeometry}
      />
      {/* )} */}
    </div>
  );
}
