import { Switch } from "@mui/material";
import { useEffect, useId, useState } from "react";
import "./style.scss";
const CSwitch = ({ label, checked, disabled = false, ...props }) => {
  const id = useId();
  const [value, setValue] = useState(false);

  useEffect(() => {
    if (!checked) return;
    setValue(checked);
  }, [checked]);
  return (
    <div className="CSwitch">
      <Switch
        id={`switch-${id}`}
        checked={value ?? false}
        onChange={(e, val) => {
          if (!disabled) setValue(val);
        }}
        {...props}
      />
    </div>
  );
};

export default CSwitch;
