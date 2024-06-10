import { useForm } from "react-hook-form";
import cls from "./style.module.scss";
import HFInputMask from "../../../../../../components/FormElements/HFInputMask";
export default function CashbackInputs({
  item,
  last = false,
  handleSubmit = () => {},
}) {
  const { control, setValue, getValues } = useForm();

  function handleChange(e) {
    handleSubmit({ id: item.id, ...getValues() });
  }
  return (
    <div className={cls.grid}>
      <div className={cls.wrapper}>
        <HFInputMask
          control={control}
          label="Silver"
          name="cashback_percent"
          placeholder="Silver"
          mask={last ? "999 999 999" : "99 %"}
          maskChar={last ? null : "_"}
          setValue={setValue}
          defaultValue={item?.cashback_percent}
          handleChange={(e) => handleChange()}
        />
        {last && <p className={cls.money}>sum</p>}
      </div>

      <div className={cls.wrapper}>
        <HFInputMask
          control={control}
          label="Gold"
          name="write_off_percent"
          placeholder="Gold"
          maskChar={last ? null : "_"}
          mask={last ? "999 999 999" : "99 %"}
          setValue={setValue}
          defaultValue={item?.write_off_percent}
          handleChange={(e) => handleChange()}
        />
        {last && <p className={cls.money}>sum</p>}
      </div>

      <div className={cls.wrapper}>
        <HFInputMask
          control={control}
          label="Platinum"
          name="step_amount"
          placeholder="Platinum"
          maskChar={last ? null : "_"}
          mask={last ? "999 999 999" : "99 %"}
          setValue={setValue}
          defaultValue={item?.step_amount}
          handleChange={(e) => handleChange()}
        />
        {last && <p className={cls.money}>sum</p>}
      </div>
    </div>
  );
}
