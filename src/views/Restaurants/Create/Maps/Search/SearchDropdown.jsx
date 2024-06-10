import cls from "./style.module.scss";
import { LocationIcon } from "../../../../../components/IconPicker/svg";
export default function SearchDropdown({
  options = [],
  setSearchAddress,
  setPlacemarkGeometry,
}) {
  return (
    <div className={cls.wrapper}>
      <h1 className={cls.title}>ПОИСК-АДРЕС</h1>
      <ul className={cls.list}>
        {options?.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              const locationPos = item.location.pos;
              item.location.pos
                ? setPlacemarkGeometry({
                    name: item.label,
                    location: [
                      Number(locationPos.split(" ")[1]),
                      Number(locationPos.split(" ")[0]),
                    ],
                  })
                : setPlacemarkGeometry({
                    name: item.label,
                    location: [item.location.lat, item.location.long],
                  });
              setSearchAddress("");
            }}
            className={cls.item}
          >
            <LocationIcon />
            <div>
              <h3>{item.label}</h3>
              <p>{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
