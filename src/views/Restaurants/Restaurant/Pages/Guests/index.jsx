import CTable from "../../../../../components/CElements/CTable";
import { useNavigate } from "react-router-dom";
import { HeadColumns } from "./HeadColumns";
import { useMemo } from "react";
import usePageRouter from "../../../../../hooks/useObjectRouter";

export default function RestaurantGuestsPage({ currentTab }) {
  const { navigateTo } = usePageRouter();
  const headColumns = HeadColumns();

  function handleRowClick() {
    navigateTo("guest/1234");
  }

  const BodySource = useMemo(() => {
    return [
      {
        index: 1,
        full_name: "Javlon Jo'rabekov",
        phone: "+998 99 999 99 99",
        degree_guest: 50,
        cashback_still: 5000,
        overal_money: "9 000 000",
      },
    ];
  }, []);

  return (
    <CTable
      outerPadding="0"
      headColumns={headColumns}
      bodyColumns={BodySource}
      clickable={true}
      handleRowClick={handleRowClick}
      idForTable={currentTab ?? "guests"}
    />
  );
}
