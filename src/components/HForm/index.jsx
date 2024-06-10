import { useImperativeHandle } from "react";
import CancelButton from "../Buttons/CancelButton";
import SaveButton from "../Buttons/SaveButton";
import cls from "./style.module.scss";

export default function HForm({
  footer = false,
  formRef,
  handleSubmit = () => {},
  onSubmit = () => {},
  styles = {},
  children,
}) {
  useImperativeHandle(formRef, () => ({
    submitForm() {
      handleSubmit(onSubmit)();
    },
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={formRef} style={{ ...styles }}>
      {children}
      {footer && (
        <div className={cls.btns}>
          <CancelButton />
          <SaveButton type="submit" minWidth="auto" styles={{ height: 40 }} />
        </div>
      )}
    </form>
  );
}
