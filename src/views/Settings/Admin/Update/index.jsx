import FormCard from "../../../../components/FormCard";
import Header from "../../../../components/Header";
import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/FormElements/HFTextField";
import cls from "./style.module.scss";
import HForm from "../../../../components/HForm";
import usePageRouter from "../../../../hooks/useObjectRouter";
import { useRef } from "react";
import HFRSwitch from "../../../../components/FormElements/HFRSwitch";
import HFInputMask from "../../../../components/FormElements/HFInputMask";
import HFSelect from "../../../../components/FormElements/HFSelect";
import { useParams } from "react-router-dom";
import CBreadcrumbs from "../../../../components/CElements/CBreadcrumbs";

export default function AdminUpdate() {
  const { control, setValue } = useForm();
  const { progmatic } = usePageRouter();
  const formRef = useRef(null);
  const { id } = useParams();

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
        title={`${id ? "Изменить" : "Добавить"} администратора`}
        extraButtons={{ type: "submit", loading: false }}
        handleExtraButtons={handleClick}
      >
        <CBreadcrumbs items={breadCrumbItems} type="link" progmatic={true} />
      </Header>
      <FormCard minHeight="auto">
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
            <HFInputMask
              control={control}
              label="Номер телефона"
              required={true}
              name="phone_number"
              placeholder="Введите номер телефона"
              mask={"+\\9\\9\\8 99 999 99 99"}
            />
            <HFTextField
              name="email"
              control={control}
              placeholder="E-mail"
              label="E-mail"
              required={true}
            />

            <HFSelect
              name="role"
              control={control}
              placeholder="Рол"
              label="Рол"
              required={true}
              options={[]}
            />
          </div>
        </HForm>
      </FormCard>
    </>
  );
}
