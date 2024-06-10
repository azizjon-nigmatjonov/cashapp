import Header from "../../../components/Header";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import RestaurantCreateForm from "./Form";
import { useForm } from "react-hook-form";
import branchService from "../../../services/branchService";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../store/alert/alert.thunk";
import { useQuery } from "react-query";
import usePageRouter from "../../../hooks/useObjectRouter";
export default function RestaurantCreate() {
  const { progmatic } = usePageRouter();
  const [loading, setLoading] = useState(false);
  const formRef = useRef();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: branch } = useQuery(
    ["GET_BRANCH_BY_ID", id],
    () => {
      return branchService.getBranch(id);
    },
    {
      enabled: !!id,
    }
  );

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Обязательное поле")
      .min(3, "Введите минимум 3 символа"),
    description: yup.string().required("Обязательное поле"),
    facebook_link: yup
      .string()
      .url("Пожалуйста, введите действительный URL")
      .required("Обязательное поле"),
    instagram_link: yup
      .string()
      .url("Пожалуйста, введите действительный URL")
      .required("Обязательное поле"),
    telegram_link: yup
      .string()
      .url("Пожалуйста, введите действительный URL")
      .required("Обязательное поле"),
    organization_id: yup.string().required("Обязательное поле"),
    lat: yup.string().required("Обязательное поле"),
    long: yup.string().required("Обязательное поле"),
    phone_number: yup
      .string()
      .matches(
        /^(\+998)\s(9[0-9])\s([0-9]{3})\s([0-9]{2})\s([0-9]{2})$/,
        "Введите действительный номер телефона"
      )
      .required("Обязательное поле"),
    shift_from: yup
      .string()
      .min(5, "Не заполнено")
      .required("Обязательное поле"),
    shift_to: yup.string().min(5, "Не заполнено").required("Обязательное поле"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    setLoading(true);
    const prev = data.photos[0]
    data.photos[0] = data.photos[1]
    data.photos[1] = prev
    data.lat = parseFloat(data.lat);
    data.long = parseFloat(data.long);
    data.phone_number = [data.phone_number.substring(1).replace(/\s+/g, "")]
    if (id) {
      data.id = id;
      branchService
        .updateElement(data)
        .then((res) => {
          dispatch(
            showAlert({
              title: "Ресторан успешно изменен",
              type: "success",
            })
          );
          progmatic();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      branchService
        .createBranch(data)
        .then((res) => {
          dispatch(
            showAlert({
              title: "Новый ресторан успешно создан",
              type: "success",
            })
          );
          reset();
          progmatic();
        })
        .finally(() => {
          setLoading(false);
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
        label: "Ресторан",
        link: -1,
      },
      {
        label: branch?.name ? branch.name : "Создать новый ресторан",
      },
    ];
  }, [branch]);

  return (
    <>
      <Header
        title="Рестораны"
        extraButtons={{ type: "submit", loading, title: id ? 'Обновлять' : 'Сохранять' }}
        handleExtraButtons={handleClick}
      >
        <CBreadcrumbs items={breadCrumbItems} type="link" progmatic={true} />
      </Header>

      <RestaurantCreateForm
        control={control}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        errors={errors}
        setValue={setValue}
        formRef={formRef}
        branch={branch}
      />
    </>
  );
}
