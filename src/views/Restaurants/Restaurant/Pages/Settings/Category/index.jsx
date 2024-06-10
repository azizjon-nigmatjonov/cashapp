import { useDispatch } from "react-redux";
import CTable from "../../../../../../components/CElements/CTable";
import usePageRouter from "../../../../../../hooks/useObjectRouter";
import { useGetQueries } from "../../../../../../hooks/useQueries";
import { useMemo } from "react";
import categoryService from "../../../../../../services/categoryService";
import { useQuery } from "react-query";
import CRSwitch from "../../../../../../components/CElements/CRSwitch";
import { showAlert } from "../../../../../../store/alert/alert.thunk";

export default function RestaurantSettingsCategory({ currentTab }) {
  const { currentPage, currentLimit, search } = useGetQueries();
  const { navigateTo } = usePageRouter();
  const dispatch = useDispatch();
  const params = useMemo(() => {
    const currentpage = parseInt(currentPage) || 1;
    const limit = parseInt(currentLimit) || 10;
    let result = {};
    result.offset = (currentpage - 1) * 10;
    result.limit = limit;
    result.search = search;

    return result;
  }, [currentPage, currentLimit, search]);

  const {
    data: categories,
    isLoading,
    refetch,
  } = useQuery(
    ["GET_CATEGORIES_LIST", params],
    () => {
      return categoryService.getList({ ...params });
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
        title: "Дата добавления",
        id: "started_date",
      },
      {
        title: "Статус",
        id: "active",
        width: 100,
        render: (val) => {
          return (
            <div onClick={() => {}}>
              <CRSwitch disabled={true} checked={val} />
            </div>
          );
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
  }, []);

  function handleActions(status, element) {
    if (status === "delete") {
      categoryService.deleteElement(element.id).then((res) => {
        dispatch(showAlert({ title: "Успешно удалено", type: "success" }));
        refetch();
      });
    } else {
      navigateTo(`category/update/${element.id}`)
    }
  }

  return (
    <CTable
      outerPadding="0"
      headColumns={headColumns}
      bodyColumns={categories?.categories ?? []}
      clickable={true}
      idForTable={currentTab}
      count={categories?.count}
      currentPage={currentPage}
      currentLimit={currentLimit}
      isLoading={isLoading}
      handleRowClick={(el) => navigateTo(`category/update/${el.id}`)}
      handleActions={handleActions}
    />
  );
}
