import FormCard from "../../../components/FormCard";
import Header from "../../../components/Header";
import { useMemo } from "react";
import CTable from "../../../components/CElements/CTable";
import CreateButton from "../../../components/Buttons/CreateButton";
import usePageRouter from "../../../hooks/useObjectRouter";
import CRSwitch from "../../../components/CElements/CRSwitch";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../store/alert/alert.thunk";
export default function AdminsPage() {
  const { navigateChildTo } = usePageRouter();
  const dispatch = useDispatch();

  function handleActions(status, element) {
    if (status === "delete") {
      dispatch(showAlert({ title: "Успешно удалено", type: "success" }));
    } else {
      navigateChildTo(`admin/${element.id}`, "settings");
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
        id: "name",
        width: 200,
      },
      {
        title: "Телефон",
        id: "phone_number",
        width: 140,
      },
      {
        title: "E-mail",
        id: "email",
        width: 240,
      },
      {
        title: "Рол",
        id: "role",
        width: 160,
      },
      {
        title: "Статус",
        id: "active",
        width: 90,
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
        name: "Muhammadaziz",
        email: "example@gmail.com",
        phone_number: "+99899 491 28 30",
        role: "Super-admin",
      },
    ];
  }, []);

  return (
    <>
      <Header
        title="Разрешения"
        extra={
          <CreateButton
            onClick={() => navigateChildTo("admin/create", "settings")}
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
            navigateChildTo(`admin/${elem.id}`, "settings");
          }}
          handleActions={handleActions}
        />
      </FormCard>
    </>
  );
}
