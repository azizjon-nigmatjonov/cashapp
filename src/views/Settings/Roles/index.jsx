import FormCard from "../../../components/FormCard";
import Header from "../../../components/Header";
import { useMemo } from "react";
import CTable from "../../../components/CElements/CTable";
import CreateButton from "../../../components/Buttons/CreateButton";
import usePageRouter from "../../../hooks/useObjectRouter";
import CRSwitch from "../../../components/CElements/CRSwitch";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../store/alert/alert.thunk";

export default function RolesPage() {
  const { navigateChildTo } = usePageRouter();
  const dispatch = useDispatch();

  function handleActions(status, element) {
    if (status === "delete") {
      dispatch(showAlert({ title: "Успешно удалено", type: "success" }));
    } else {
      navigateChildTo(`roles/${element.id}`, "settings");
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
        title: "Статус",
        id: "active",
        width: 200,
        click: "custom",
        render: (val) => {
          return (
            <div onClick={() => {}}>
              <CRSwitch checked={val} />
            </div>
          );
        },
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

  const bodyColumns = useMemo(() => {
    return [
      {
        id: 1,
        title: "Super-admin",
        active: true,
      },
    ];
  }, []);

  return (
    <>
      <Header
        title="Разрешения"
        extra={
          <CreateButton
            onClick={() => navigateChildTo("roles/create", "settings")}
          />
        }
      />
      <FormCard>
        <CTable
          headColumns={headColumns}
          bodyColumns={bodyColumns}
          isResizeble={false}
          clickable={true}
          disablePagination={true}
          handleRowClick={(elem) => {
            navigateChildTo(`roles/${elem.id}`, "settings");
          }}
          handleActions={handleActions}
        />
      </FormCard>
    </>
  );
}
