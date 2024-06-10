import cls from "./style.module.scss";
export default function CError({ errors, name, styles }) {
  return (
    <div className={cls.error} style={{ ...styles }}>
      {errors?.[name]?.message && <p>{errors[name].message}</p>}
    </div>
  );
}
