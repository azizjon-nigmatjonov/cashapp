import { useMemo, useState } from "react";
import CTable from "../../components/CElements/CTable";
import CFilter from "../../components/CElements/CFilter";
import { useGetQueries } from "../../hooks/useQueries";
import { useDispatch } from "react-redux";
import { showAlert } from "../../store/alert/alert.thunk";
import usePageRouter from "../../hooks/useObjectRouter";
import branchService from "../../services/branchService";
import { FormatTime } from "../../utils/formatTime";

const RestaurantsTable = ({
  branches,
  currentLimit,
  currentPage,
  isLoading,
  refetch = () => {},
}) => {
  const { currentSort } = useGetQueries();
  const { navigateTo } = usePageRouter();
  const dispatch = useDispatch();

  function handleRowClick(element) {
    navigateTo(`restaurant/${element?.id}`);
  }

  function handleActions(status, element) {
    if (status === "delete") {
      branchService
        .deleteElement(element.id)
        .then((res) => {
          dispatch(showAlert({ title: "Успешно удалено", type: "success" }));
        })
        .finally(() => refetch());
    } else {
      navigateTo(`restaurant/update/${element?.id}`);
    }
  }

  const headData = useMemo(() => {
    return [
      {
        title: "№",
        id: "index",
        textAlign: "center",
      },
      {
        title: "Название",
        id: "name",
      },
      {
        title: "Номер телефона",
        id: "phone_number",
      },
      {
        title: "Кэшбек он",
        id: "",
        width: 220,
      },
      {
        title: "Кешбек ин",
        id: "",
        width: 220,
      },
      {
        title: "Действия",
        id: "actions",
        textAlign: "center",
        click: "custom",
        width: 120,
      },
    ];
  }, []);

  return (
    <CTable
      currentPage={currentPage}
      currentLimit={currentLimit}
      clickable={true}
      passRouter={true}
      isResizeble={true}
      isLoading={isLoading}
      headColumns={headData}
      bodyColumns={branches?.branches ?? []}
      count={branches?.count || 1}
      handleRowClick={handleRowClick}
      handleActions={handleActions}
    />
  );
};

export default RestaurantsTable;
