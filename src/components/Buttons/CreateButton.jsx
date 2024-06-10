import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import "./style.scss";

const CreateButton = ({ children, title = "Добавить", ...props }) => {
  return (
    <div className="CbtnWrapper">
      <LoadingButton
        startIcon={<AddIcon />}
        variant="contained"
        loadingPosition="start"
        {...props}
      >
        {title}
      </LoadingButton>
    </div>
  );
};

export default CreateButton;
