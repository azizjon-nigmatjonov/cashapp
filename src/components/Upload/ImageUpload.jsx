import { useEffect, useState } from "react";
import { useRef } from "react";
import ImageViewer from "react-simple-image-viewer";
import { CircularProgress } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import "./Gallery/style.scss";
import fileService from "../../services/fileService";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";

const ImageUpload = ({ imageUrl, onChange, className }) => {
  const inputRef = useRef(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (imageUrl) setValue(imageUrl);
  }, [imageUrl]);

  const imageClickHandler = (index) => {
    setPreviewVisible(true);
  };

  const inputChangeHandler = (e) => {
    setLoading(true);
    const file = e.target.files[0];

    const data = new FormData();
    data.append("file", file);

    fileService
      .upload(data)
      .then((res) => {
        if (!res?.filename) return;
        onChange(res.filename);
      })
      .finally(() => {
        handleFileChange(e);
        setLoading(false);
      });
  };

  const handleFileChange = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      setValue(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const deleteImage = (id) => {
    setValue("");
    onChange("");
  };

  const closeButtonHandler = (e) => {
    e.stopPropagation();
    deleteImage();
  };

  return (
    <div className={`Gallery ${className}`}>
      {value && (
        <div className="block" onClick={() => imageClickHandler()}>
          <button
            className="close-btn"
            type="button"
            onClick={(e) => closeButtonHandler(e)}
          >
            <CancelIcon />
          </button>
          <img src={value} alt="" />
        </div>
      )}

      {!value && (
        <div
          className="add-block block"
          onClick={() => inputRef.current.click()}
        >
          <div className="add-icon">
            {!loading ? (
              <>
                <CloudUploadRoundedIcon style={{ fontSize: "35px" }} />
                {/* <p>Max size: 4 MB</p> */}
              </>
            ) : (
              <CircularProgress />
            )}
          </div>

          <input
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={inputChangeHandler}
          />
        </div>
      )}

      {previewVisible && (
        <ImageViewer
          src={[value]}
          currentIndex={0}
          disableScroll={true}
          closeOnClickOutside={true}
          onClose={() => setPreviewVisible(false)}
        />
      )}
    </div>
  );
};

export default ImageUpload;
