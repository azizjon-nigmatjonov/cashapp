import FormCard from "../../../components/FormCard";
import Header from "../../../components/Header";
import { useMemo } from "react";
import CTable from "../../../components/CElements/CTable";
import usePageRouter from "../../../hooks/useObjectRouter";
import { useSelector } from "react-redux";
import { removeValueString } from "../../../utils/removeValueString";
import CRSwitch from "../../../components/CElements/CRSwitch";

export default function PermissionPage() {
  const permissions = useSelector((state) => state.website.permissions);
  const { navigateChildTo } = usePageRouter();
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
        title: "URL",
        id: "permission",
        // width: 350,
      },
      {
        title: "Статус",
        id: "active",
        width: 100,
        click: "custom",
        render: (val) => {
          return (
            <div onClick={() => {}}>
              <CRSwitch checked={val} />
            </div>
          );
        },
      },
    ];
  }, []);

  const bodyColumns = useMemo(() => {
    if (!permissions?.list) return;
    return permissions?.list;
  }, [permissions]);

  return (
    <>
      <Header title="Разрешения" />
      <FormCard>
        <CTable
          headColumns={headColumns}
          bodyColumns={bodyColumns}
          clickable={true}
          isResizeble={false}
          disablePagination={true}
          autoHeight={true}
          handleRowClick={(elem) => {
            navigateChildTo(
              `permissions/${removeValueString(elem.permission, "/")}`,
              "settings"
            );
          }}
        />
      </FormCard>
    </>
  );
}
