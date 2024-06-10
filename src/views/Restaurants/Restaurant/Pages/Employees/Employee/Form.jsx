import HFTextField from "../../../../../../components/FormElements/HFTextField";
import cls from "./style.module.scss";
import HForm from "../../../../../../components/HForm";
import HFSelect from "../../../../../../components/FormElements/HFSelect";
import organizationService from "../../../../../../services/organizationService";
import { useQuery } from "react-query";
import { useMemo } from "react";
import HFRSwitch from "../../../../../../components/FormElements/HFRSwitch";
import HFImageUpload from "../../../../../../components/FormElements/HFImageUpload";

export default function EmloyeeForm({
  control,
  errors,
  onSubmit,
  handleSubmit,
  formRef,
  menu = {},
  setValue = () => {},
}) {
  return (
    <HForm onSubmit={onSubmit} handleSubmit={handleSubmit} formRef={formRef}>
      <HFRSwitch name="is_active" control={control} label="Активный" />
      <div className={cls.image}>
        <HFImageUpload
          name="image"
          control={control}
          label="Фото"
          setValue={setValue}
        />
      </div>
      <div className={cls.formGrid}>
        <HFTextField
          name="title"
          control={control}
          placeholder="Название меню"
          label="Название меню"
          required={true}
          defaultValue={menu?.title}
          setValue={setValue}
        />
        {/* <HFSelect
          name="organization_id"
          control={control}
          label="Организация"
          required={true}
          placeholder="Выберите oрганизация"
          options={OrganizationOptions}
          defaultValue={menu?.organization_id}
          setValue={setValue}
        /> */}
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
