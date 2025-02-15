import BackButton from "../BackButton";
import CancelButton from "../Buttons/CancelButton";
import SaveButton from "../Buttons/SaveButton";
import IconGenerator from "../IconPicker/IconGenerator";
import styles from "./style.module.scss";

const Header = ({
  title = "",
  subtitle,
  extra,
  children,
  loader,
  backButtonLink,
  icon,
  sticky,
  extraButtons,
  handleExtraButtons = () => {},
  ...props
}) => {
  return (
    <div
      className={`${styles.header} ${sticky ? styles.sticky : ""}`}
      {...props}
    >
      <div className={styles.leftSide}>
        {backButtonLink && <BackButton link={backButtonLink} />}

        {icon && <IconGenerator className={styles.icon} icon={icon} />}

        <div className={styles.titleBlock}>
          {title && <div className={styles.title}>{title}</div>}
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        </div>

        <div className={styles.line} />

        <div>{children}</div>
      </div>

      <div style={styles.rightSide}>{extra}</div>
      {extraButtons && (
        <div className={styles.formButtons}>
          <CancelButton onClick={() => handleExtraButtons("cancel")} />
          <SaveButton
            id={extraButtons?.id}
            type={extraButtons?.type || "text"}
            minWidth="auto"
            styles={{ height: 40, ...extraButtons?.styles }}
            onClick={() => handleExtraButtons("submit")}
            loading={extraButtons?.loading}
            title={extraButtons?.title}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
