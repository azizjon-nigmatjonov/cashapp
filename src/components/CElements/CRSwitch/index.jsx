import { useEffect, useState } from "react";
import "./indec.scss";
import RcSwitch from "rc-switch";

export default function CRSwitch({
  style,
  checked = false,
  disabled,
  ...props
}) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    if (!checked) return;
    setValue(checked);
  }, [checked]);
  return (
    <RcSwitch
      style={{ outline: "none", ...style }}
      checked={value}
      onChange={(e) => {
        if (!disabled) setValue(e);
      }}
      {...props}
    />
  );
}
