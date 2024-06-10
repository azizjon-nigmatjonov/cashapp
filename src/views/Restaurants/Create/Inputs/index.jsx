import HFInputMask from "../../../../components/FormElements/HFInputMask";
import HFTextField from "../../../../components/FormElements/HFTextField";
import cls from "./style.module.scss";
import HFTextareaAutosize from "../../../../components/FormElements/HFTextareaAutosize";
import HFSelect from "../../../../components/FormElements/HFSelect";

export default function RestaurantInputs({
  control,
  errors,
  organizations,
  branch,
  setValue,
}) {
  return (
    <div>
      <div className={cls.grid}>
        <HFTextField
          name="name"
          control={control}
          placeholder="Имя"
          label="Имя"
          required={true}
          setValue={setValue}
          defaultValue={branch?.name}
        />
        <HFInputMask
          control={control}
          name="phone_number"
          placeholder="Введите номер телефона"
          mask={"+\\9\\9\\8 99 999 99 99"}
          label="Номер телефона"
          required={true}
          setValue={setValue}
          defaultValue={branch?.phone_number}
        />
        <HFSelect
          name="organization_id"
          control={control}
          label="Организация"
          required={true}
          placeholder="Выберите oрганизация"
          options={organizations}
          setValue={setValue}
          defaultValue={branch?.organization_id}
        />
        <HFTextField
          name="facebook_link"
          control={control}
          placeholder="Ссылка на Facebook"
          label="Ссылка на Facebook"
          required={true}
          setValue={setValue}
          defaultValue={branch?.facebook_link}
        />
        <HFTextField
          name="instagram_link"
          control={control}
          placeholder="Ссылка на инстаграм"
          label="Ссылка на инстаграм"
          required={true}
          setValue={setValue}
          defaultValue={branch?.instagram_link}
        />
        <HFTextField
          name="telegram_link"
          control={control}
          placeholder="Ссылка на телеграмму"
          label="Ссылка на телеграмму"
          required={true}
          setValue={setValue}
          defaultValue={branch?.telegram_link}
        />
      </div>
      <div className={cls.grid2}>
        <HFInputMask
          control={control}
          name="shift_from"
          placeholder="00:00"
          mask={"99:99"}
          label="Время начинает работу"
          required={true}
          setValue={setValue}
          defaultValue={branch?.shift_from?.substring(0, 5)}
        />
        <HFInputMask
          control={control}
          name="shift_to"
          placeholder="00:00"
          mask={"99:99"}
          label="Время заканчивает работу"
          required={true}
          setValue={setValue}
          defaultValue={branch?.shift_to?.substring(0, 5)}
        />
      </div>
      <HFTextareaAutosize
        name="description"
        control={control}
        placeholder="Описание"
        label="Описание"
        rows={7}
        errors={errors}
        required={true}
        setValue={setValue}
        defaultValue={branch?.description}
      />
    </div>
  );
}
