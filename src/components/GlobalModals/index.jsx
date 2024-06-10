import { useDispatch } from "react-redux";
import LogoutModal from "./LogoutModal";
import { websiteActions } from "../../store/website/website.slice";
import GuestVisitReportModal from "./VisitReportModal";

export default function GlobalModalWrapper({ data = {} }) {
  const dispatch = useDispatch();

  function handleCloseModal() {
    dispatch(websiteActions.setLogoutModal({}));
  }

  const ModalUI = () => {
    switch (data?.step) {
      case "logout":
        return <LogoutModal onClose={handleCloseModal} />;
      case "visit_report":
        return (
          <GuestVisitReportModal onClose={handleCloseModal} data={data.data} />
        );
      default:
        return;
    }
  };

  return (
    <>
      <ModalUI />
    </>
  );
}
