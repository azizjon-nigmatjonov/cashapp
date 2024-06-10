import { Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const CancelButton = ({
  children,
  title = "Отмена",
  minWidth = "auto",
  styles = { height: 40 },
  ...props
}) => {
  return (
    <div className="CbtnWrapper cancel">
      <Button
        style={{ minWidth, ...styles }}
        startIcon={<CancelIcon style={{ color: "#ed0101" }} />}
        variant="contained"
        color="error"
        {...props}
      >
        {title}
      </Button>
    </div>
  );
};

export default CancelButton;
