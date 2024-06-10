import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import styles from "./style.module.scss";
import GlobalModalWrapper from "../../components/GlobalModals";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const logoutModalData = useSelector((state) => state.website.logoutModal);
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>
        <Outlet />
      </div>

      {logoutModalData?.step && <GlobalModalWrapper data={logoutModalData} />}
    </div>
  );
};

export default MainLayout;
