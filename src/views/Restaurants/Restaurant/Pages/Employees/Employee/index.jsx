import { useMemo, useRef, useState } from "react";
import CBreadcrumbs from "../../../../../../components/CElements/CBreadcrumbs";
import Header from "../../../../../../components/Header";
import usePageRouter from "../../../../../../hooks/useObjectRouter";
import EmloyeeForm from "./Form";
import FormCard from "../../../../../../components/FormCard";
import EmployeeForm from "../../Menu/Create/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation } from "../../Menu/Create/validation";
import { useForm } from "react-hook-form";
export default function EmployeePage() {
  const schema = validation();
  const formRef = useRef();
  const { progmatic } = usePageRouter();
  const [loading, setLoading] = useState(false);
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  function handleClick(evt) {
    if (evt === "cancel") {
      progmatic();
      return;
    }
  }

  const breadCrumbItems = useMemo(() => {
    return [
      {
        label: "Меню",
        link: -1,
      },
      {
        label: "Добавить employee",
      },
    ];
  }, []);

  function onSubmit(data) {}

  return (
    <div>
      <Header
        title="Добавление меню"
        extraButtons={{ type: "submit", loading: false }}
        handleExtraButtons={handleClick}
      >
        <CBreadcrumbs items={breadCrumbItems} progmatic={true} type="link" />
      </Header>
      <FormCard minHeight="120px">
        <EmployeeForm
          control={control}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          formRef={formRef}
          errors={errors}
          setValue={setValue}
        />
      </FormCard>
    </div>
  );
}
