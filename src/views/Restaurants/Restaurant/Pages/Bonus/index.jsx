import { useMemo } from "react";
import CTable from "../../../../../components/CElements/CTable";
export default function RestaurantBonusPage({ currentTab }) {
  const headColumns = useMemo(() => {
    return [
      {
        id: "index",
        width: 50,
        textAlign: "center",
      },
      {
        title: "ФИО сотрудника",
        width: 300,
        id: "full_name",
      },
      {
        title: "Касса",
        id: "cash",
      },
      {
        title: "% бонусов",
        id: "bonus_percent",
      },
    ];
  }, []);
  return (
    <>
      <CTable headColumns={headColumns} idForTable={currentTab} />
    </>
  );
}
