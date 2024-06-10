import { Divider, Chip } from "@mui/material";
import "./style.scss";
export default function CDivider({
  color = "#e5e9eb",
  spacing = "30px 0",
  label = "",
}) {
  return (
    <div className="CDivider">
      <Divider style={{ margin: spacing, borderColor: color }}>
        {label ? <Chip label={label} /> : ""}
      </Divider>
    </div>
  );
}
