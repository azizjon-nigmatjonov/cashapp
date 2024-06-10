import { TextField } from "@mui/material";
import CLabel from "../CLabel";
import "./style.scss";
import { VisibilityOff, Visibility } from "@mui/icons-material";

const CTextField = ({
  control,
  name = "",
  required = false,
  rules = {},
  label,
  disabled = false,
  password = false,
  defaultValue,
  errors = {},
  setPassword = () => {},
  onChange = () => {},
  ...props
}) => {
  return (
    <div className="HFInput">
      {label && <CLabel title={label} required={required} />}

      <TextField
        size="small"
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
        type={props.type || "text"}
        disabled={disabled}
        error={errors[name]}
        helperText={errors[name]?.message}
        name={name}
        {...props}
      />
      {password && (
        <span
          className="visibility"
          onClick={() => setPassword((prev) => !prev)}
        >
          {props.type === "password" ? <VisibilityOff /> : <Visibility />}
        </span>
      )}
    </div>
  );
};

export default CTextField;
