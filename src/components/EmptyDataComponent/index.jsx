import "./style.scss";
import companyLogo from "../../../public/images/no-data.png";

const EmptyDataComponent = ({ title = "Нет данных", isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="EmptyDataComponent">
      <div className="block">
        <div className="icon">
          <img src={companyLogo} alt="img" />
        </div>
        <p className="text">{title}</p>
      </div>
    </div>
  );
};

export default EmptyDataComponent;
