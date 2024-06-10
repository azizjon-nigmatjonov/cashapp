import FormCard from "../../../../components/FormCard";
import Header from "../../../../components/Header";
import cls from "./style.module.scss";
import usePageRouter from "../../../../hooks/useObjectRouter";
import { useRef } from "react";
import { useSelector } from "react-redux";
import CBreadcrumbs from "../../../../components/CElements/CBreadcrumbs";
import CTextField from "../../../../components/CElements/CTextField";
import CLabel from "../../../../components/CElements/CLabel";
import CDivider from "../../../../components/CElements/CDivider";
import RoleList from "./List";

export default function RoleUpdate() {
  const permissions = useSelector((state) => state.website.permissions);
  const { progmatic } = usePageRouter();
  const formRef = useRef(null);

  function handleClick(evt) {
    if (evt === "cancel") {
      progmatic();
      return;
    }
    formRef.current.submitForm();
  }

  const breadCrumbItems = [
    {
      label: "Назад",
      link: -1,
    },
  ];

  return (
    <>
      <Header
        title="Настройки доступa для роли"
        extraButtons={{ type: "submit", loading: false }}
        handleExtraButtons={handleClick}
      >
        <CBreadcrumbs items={breadCrumbItems} type="link" progmatic={true} />
      </Header>
      <FormCard maxWidth="800px" minHeight="auto" padding="20px 20px 0px 20px">
        <div className={cls.top}>
          <p className={cls.title}>Название роли</p>
          <div className={cls.textfield}>
            <CTextField
              disabled={true}
              value="Super-admin"
              placeholder="Название роли"
            />
          </div>
        </div>
      </FormCard>
      <FormCard maxWidth="800px" minHeight="auto">
        <CLabel title="Доступный опции" styles={{ fontSize: "20px" }} />
        <CDivider spacing="15px 0" />
        <RoleList />
      </FormCard>
    </>
  );
}
