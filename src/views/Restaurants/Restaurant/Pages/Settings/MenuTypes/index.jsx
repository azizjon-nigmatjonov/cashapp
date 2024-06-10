import { useMemo } from "react";
import CTable from "../../../../../../components/CElements/CTable";
import { useGetQueries } from "../../../../../../hooks/useQueries";
import { useQuery } from "react-query";
import usePageRouter from "../../../../../../hooks/useObjectRouter";
import menuService from "../../../../../../services/menuService";
import { useLocation } from "react-router-dom";
import CRSwitch from "../../../../../../components/CElements/CRSwitch";
import { FormatTime } from "../../../../../../utils/formatTime";

export default function RestaurantSettingsMenuTypes({ currentTab }) {
  const { currentLimit, currentPage } = useGetQueries();
  const { navigateTo } = usePageRouter();
  const location = useLocation();

  const params = useMemo(() => {
    const currentpage = parseInt(currentPage) || 1;
    const limit = parseInt(currentLimit) || 10;
    let result = {};
    result.offset = (currentpage - 1) * 10;
    result.limit = limit;

    return result;
  }, [currentPage, currentLimit]);

  const { data: menus, isLoading } = useQuery(
    ["GET_MENU_LIST_FOR_SETTINGS", params],
    () => {
      return menuService.getList({ ...params });
    },
    {
      enabled: !!params.limit,
    }
  );

  const headColumns = useMemo(() => {
    return [
      {
        id: "index",
        width: 50,
        textAlign: "center",
      },
      {
        title: "Название",
        id: "title",
      },
      {
        title: "Дата",
        id: "created_at",
        render: (time) => <>{FormatTime(time, "date")}</>,
      },
      {
        title: "Статус",
        id: "is_active",
        width: 100,
        render: (val) => {
          return <CRSwitch checked={val} disabled={true} />;
        },
      },
    ];
  }, []);

  return (
    <CTable
      outerPadding="0"
      headColumns={headColumns}
      bodyColumns={menus?.menus ?? []}
      clickable={true}
      idForTable={currentTab}
      count={menus?.count}
      currentPage={currentPage}
      currentLimit={currentLimit}
      isLoading={isLoading}
      handleRowClick={(el) =>
        navigateTo(`products/${el.id}`, "/object/", { url: location?.pathname })
      }
    />
  );
}
