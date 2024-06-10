import { Typography } from "@mui/material";
import "./style.scss";

const FormCard = ({
  visible = true,
  children,
  title,
  className,
  extra,
  maxWidth = "100%",
  minHeight = "300px",
  padding = "20px",
  innerPadding = "16px",
  styles,
  ...props
}) => {
  if (!visible) return null;

  return (
    <div
      className={`FormCard ${className}`}
      style={{ maxWidth, padding, ...styles }}
    >
      <div className="card" {...props}>
        {title && (
          <div className="header">
            <Typography variant="h4" className="title">
              {title}
            </Typography>
            <div className="extra">{extra}</div>
          </div>
        )}
        <div className="content" style={{ minHeight, padding: innerPadding }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormCard;
