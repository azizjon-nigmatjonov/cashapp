import { Button, CircularProgress } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import "./style.scss";

const SaveButton = ({
  children,
  loading,
  title = "Сохранять",
  minWidth = 130,
  styles = {},
  ...props
}) => {
  return (
    <div className="CbtnWrapper">
      <Button
        style={{ minWidth, ...styles }}
        startIcon={
          loading ? (
            <CircularProgress size={14} style={{ color: "#fff" }} />
          ) : (
            <SaveIcon />
          )
        }
        variant="contained"
        {...props}
      >
        {title}
      </Button>
    </div>
  );
};

export default SaveButton;
