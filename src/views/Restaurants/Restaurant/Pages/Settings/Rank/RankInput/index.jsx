import HFTextField from "../../../../../../../components/FormElements/HFTextField";
import cls from "./style.module.scss";
export default function RankInput({ control, name, label, placeholder }) {
  return (
    <div className={cls.wrapper}>
      {/* <div className={cls.box}>
        <div className={`${cls.box} ${cls[name]}`}></div>
      </div> */}
      <HFTextField
        name={name}
        control={control}
        label={label}
        placeholder={placeholder}
      />
    </div>
  );
}
