import HFTextField from "../../../../../../components/FormElements/HFTextField";
import cls from "./style.module.scss";
import HForm from "../../../../../../components/HForm";
import HFSelect from "../../../../../../components/FormElements/HFSelect";
import organizationService from "../../../../../../services/organizationService";
import { useQuery } from "react-query";
import { useMemo } from "react";
import HFRSwitch from "../../../../../../components/FormElements/HFRSwitch";
import HFImageUpload from "../../../../../../components/FormElements/HFImageUpload";
import HFInputMask from "../../../../../../components/FormElements/HFInputMask";

export default function EmployeeForm({
  control,
  errors,
  onSubmit,
  handleSubmit,
  formRef,
  setValue = () => {},
}) {
  const { data: organizations } = useQuery(
    ["GET_ORGANIZATION_LIST_FOR_SETTINGS"],
    () => {
      return organizationService.getList({ offset: 0, limit: 100 });
    }
  );

  return (
    <HForm onSubmit={onSubmit} handleSubmit={handleSubmit} formRef={formRef}>
      <div className={cls.image}>
        <HFImageUpload
          name="image"
          control={control}
          label="Фото"
          setValue={setValue}
          errors={errors}
        />
      </div>
      <div className={cls.formGrid}>
        <HFTextField
          name="title"
          control={control}
          placeholder="ФИО"
          label="ФИО"
          required={true}
          setValue={setValue}
        />
        <HFSelect
          name="organization_id"
          control={control}
          label="Должность"
          required={true}
          placeholder="Должность"
          options={[]}
          setValue={setValue}
        />
        <HFInputMask
          control={control}
          label="Номер телефона"
          required={true}
          name="phone_number"
          placeholder="Введите номер телефона"
          mask={"+\\9\\9\\8 99 999 99 99"}
        />
        {/* <HFTextField
          name="facebook_link"
          control={control}
          placeholder="Цена блюда"
          label="Цена блюда"
          required={true}
        /> */}
        {/* <HFTextareaAutosize
          name="description"
          control={control}
          placeholder="Описание"
          label="Описание"
          rows={7}
          errors={errors}
          required={true}
        /> */}
        {/* <div>
          <CLabel title="Фото" required={true} />
          <HFImageUpload control={control} name="photo" />
        </div> */}
      </div>
    </HForm>
  );
}
