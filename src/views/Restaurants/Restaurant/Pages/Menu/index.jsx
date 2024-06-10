import { useNavigate } from "react-router-dom";
import CTable from "../../../../../components/CElements/CTable";
import menuService from "../../../../../services/menuService";
import { useQuery } from "react-query";
import { useMemo } from "react";
import CFilter from "../../../../../components/CElements/CFilter";
import { useGetQueries } from "../../../../../hooks/useQueries";
import usePageRouter from "../../../../../hooks/useObjectRouter";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../../../store/alert/alert.thunk";
import CRSwitch from "../../../../../components/CElements/CRSwitch";

export default function RestaurantMenuPage({ currentTab }) {
  const dispatch = useDispatch();

  const { currentSort, currentLimit, currentPage } = useGetQueries();
  const params = useMemo(() => {
    const currentpage = parseInt(currentPage) || 1;
    const limit = parseInt(currentLimit) || 10;
    let result = {};
    result.offset = (currentpage - 1) * 10;
    result.limit = limit;

    return result;
  }, [currentPage, currentLimit]);

  const { navigateTo } = usePageRouter();

  const {
    data: menus,
    isLoading,
    refetch,
  } = useQuery(
    ["GET_MENU_LIST", params],
    () => {
      return menuService.getList({ ...params });
    },
    {
      enabled: !!params.limit,
    }
  );

  function handleActions(status, element) {
    if (status === "delete") {
      menuService.deleteElement(element.id).then((res) => {
        dispatch(showAlert({ title: "Успешно удалено", type: "success" }));
        refetch();
      });
    } else {
      navigateTo(`menu/update/${element.id}`);
    }
  }

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
        title: "Цена блюд",
        id: "price_dishes",
        filter: true,
      },
      {
        title: "Категория блюда",
        id: "category_dishes",
      },
      {
        title: "Статус",
        id: "is_active",
        width: 100,
        render: (val) => {
          return <CRSwitch checked={val} disabled={true} />;
        },
      },
      {
        title: "Действия",
        id: "actions",
        textAlign: "center",
        click: "custom",
        width: 100,
      },
    ];
  }, [currentSort]);

  return (
    <>
      <CTable
        outerPadding="0"
        headColumns={headColumns}
        bodyColumns={menus?.menus ?? []}
        clickable={true}
        isResizeble={true}
        handleRowClick={(el) => navigateTo(`menu/update/${el.id}`)}
        idForTable={currentTab}
        count={menus?.count}
        currentPage={currentPage}
        currentLimit={currentLimit}
        isLoading={isLoading}
        handleActions={handleActions}
      />
    </>
  );
}
