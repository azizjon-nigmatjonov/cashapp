import { useMemo } from "react";
import CTable from "../../../../../components/CElements/CTable";
export default function RestaurantCashbackPage({ currentTab }) {
  const headColumns = useMemo(() => {
    return [
      {
        id: "index",
        width: 50,
        textAlign: "center",
      },
      {
        title: "Кэшбек on",
        width: 300,
        id: "cash_on",
      },
      {
        title: "Кэшбек in",
        id: "cash_in",
      },
      {
        title: "Дата",
        id: "started_at",
      },
    ];
  }, []);
  return (
    <>
      <CTable headColumns={headColumns} idForTable={currentTab} />
    </>
  );
}
