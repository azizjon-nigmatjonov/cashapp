import FormCard from "../../../components/FormCard";
import Header from "../../../components/Header";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { useForm } from "react-hook-form";
import HFTextField from "../../../components/FormElements/HFTextField";
import cls from "./style.module.scss";
import usePageRouter from "../../../hooks/useObjectRouter";
import { useMemo, useRef } from "react";
import HForm from "../../../components/HForm";
import { Validation } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import organizationService from "../../../services/organizationService";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../store/alert/alert.thunk";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import HFInputMask from "../../../components/FormElements/HFInputMask";

export default function OrganizationCreate() {
  const { progmatic } = usePageRouter();
  const formRef = useRef();
  const schema = Validation();
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const { data: organization } = useQuery(
    ["GET_ORGANIZATION_EDIT", id],
    () => {
      return organizationService.getElement(id);
    },
    {
      enabled: !!id,
    }
  );

  function onSubmit(data) {
    data.phone_number = data.phone_number.substring(1).replace(/\s+/g, "");
    if (id) {
      data.id = id;
      organizationService.updateElement(data).then((res) => {
        dispatch(
          showAlert({
            title: "Организация успешно обновлена",
            type: "success",
          })
        );
        reset();
        progmatic();
      });
    } else {
      organizationService.createOrganizationFn(data).then((res) => {
        dispatch(
          showAlert({
            title: "Новая организация успешно создана",
            type: "success",
          })
        );
        reset();
        progmatic();
      });
    }
  }

  function handleClick(evt) {
    if (evt === "cancel") {
      progmatic();
      return;
    }
    formRef.current.submitForm();
  }

  const breadCrumbItems = useMemo(() => {
    return [
      {
        label: "Организация",
        link: -1,
      },
      {
        label: id ? "Редактировать" : "Создание",
      },
    ];
  }, [id]);

  return (
    <>
      <Header
        title="Добавление организации"
        extraButtons={true}
        handleExtraButtons={handleClick}
      >
        <CBreadcrumbs items={breadCrumbItems} progmatic={true} type="link" />
      </Header>
      <FormCard minHeight="120px">
        <HForm
          formRef={formRef}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        >
          <div className={cls.grid}>
            <HFTextField
              name="name"
              control={control}
              placeholder="Название"
              defaultValue={organization?.name}
              label="Название"
              setValue={setValue}
              required={true}
            />
            <HFInputMask
              control={control}
              label="Номер телефона"
              defaultValue={organization?.phone_number}
              required={true}
              setValue={setValue}
              name="phone_number"
              placeholder="Введите номер телефона"
              mask={"+\\9\\9\\8 99 999 99 99"}
            />
            {/* <HFImageUpload
              name="logo"
              control={control}
              label="Логотип"
              setValue={setValue}
              defaultValue={organization?.logo}
              errors={errors}
            /> */}
          </div>
        </HForm>
      </FormCard>
    </>
  );
}
