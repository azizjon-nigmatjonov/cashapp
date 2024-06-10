import { useMemo } from "react";
import CTable from "../../../../../components/CElements/CTable";
import usePageRouter from "../../../../../hooks/useObjectRouter";
export default function RestaurantsEmployeesPage({ currentTab }) {
  const { navigateTo } = usePageRouter();

  function handleRowClick(element) {
    navigateTo(`employee/${"1234"}`);
  }

  function handleActions(status, element) {
    if (status === "delete") {
      productService.deleteElement(element.id).then((res) => {
        dispatch(showAlert({ title: "Успешно удалено", type: "success" }));
        refetch();
      });
    } else {
      handleRowClick(element)
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
        title: "ФИ",
        width: 300,
        id: "full_name",
      },
      {
        title: "Номер телефона",
        id: "phone_number",
      },
      {
        title: "Должность",
        id: "job",
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

  const bodyColumns = [
    {
      index: 1,
      full_name: "Muhammad Aziz",
      phone_number: "+998 99 491 28 30",
      job: "Programmer",
    },
  ];

  return (
    <>
      <CTable
        headColumns={headColumns}
        bodyColumns={bodyColumns}
        idForTable={currentTab}
        clickable={true}
        handleRowClick={handleRowClick}
        handleActions={handleActions}
      />
    </>
  );
}
