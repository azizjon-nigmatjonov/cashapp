import FormCard from "../../../../components/FormCard";
import Header from "../../../../components/Header";
import { useForm } from "react-hook-form";
import HFTextField from "../../../../components/FormElements/HFTextField";
import cls from "./style.module.scss";
import HForm from "../../../../components/HForm";
import usePageRouter from "../../../../hooks/useObjectRouter";
import { useRef } from "react";
import { useSelector } from "react-redux";
import HFRSwitch from "../../../../components/FormElements/HFRSwitch";

export default function PermissionUpdate() {
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

  return (
    <>
      <Header
        title="Изменить разрешение"
        extraButtons={{ type: "submit", loading: false }}
        handleExtraButtons={handleClick}
      ></Header>
      <FormCard minHeight="auto">
        <HForm formRef={formRef}>
          <HFRSwitch name="active" control={control} label="Статус" />
          <div className={cls.grid}>
            <HFTextField
              name="name"
              control={control}
              placeholder="Название"
              label="Название"
              setValue={setValue}
              defaultValue="/object/dashboard"
              required={true}
            />
            <HFTextField
              name="permission"
              control={control}
              placeholder="URL"
              label="URL"
              setValue={setValue}
              defaultValue="/object/dashboard"
              disabled={true}
            />
          </div>
        </HForm>
      </FormCard>
    </>
  );
}
