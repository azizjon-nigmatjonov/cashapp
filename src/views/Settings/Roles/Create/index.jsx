import FormCard from "../../../../components/FormCard";
import Header from "../../../../components/Header";
import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/FormElements/HFTextField";
import cls from "./style.module.scss";
import HForm from "../../../../components/HForm";
import usePageRouter from "../../../../hooks/useObjectRouter";
import { useRef } from "react";
import { useSelector } from "react-redux";
import CBreadcrumbs from "../../../../components/CElements/CBreadcrumbs";
import HFRSwitch from "../../../../components/FormElements/HFRSwitch";

export default function RoleCreate() {
  const permissions = useSelector((state) => state.website.permissions);
  const { control, setValue } = useForm();
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
        title="Добавить роль"
        extraButtons={{ type: "submit", loading: false }}
        handleExtraButtons={handleClick}
      >
        <CBreadcrumbs items={breadCrumbItems} type="link" progmatic={true} />
      </Header>
      <FormCard maxWidth="800px" minHeight="auto">
        <HForm formRef={formRef}>
          <HFRSwitch name="active" control={control} label="Статус" />
          <div className={cls.grid}>
            <HFTextField
              name="name"
              control={control}
              placeholder="Название"
              label="Название"
              required={true}
            />
          </div>
        </HForm>
      </FormCard>
    </>
  );
}
