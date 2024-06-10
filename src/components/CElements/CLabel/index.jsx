import cls from "./style.module.scss";
export default function CLabel({ title = "label", required, styles = {} }) {
  return (
    <p className={cls.label} style={{ ...styles }}>
      {required ? <span className={cls.required}>*</span> : ""}
      {title}
    </p>
  );
}
