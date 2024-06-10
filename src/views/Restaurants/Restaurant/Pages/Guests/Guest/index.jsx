import FormCard from "../../../../../../components/FormCard";
import CTabs from "../../../../../../components/CElements/CTab";
import { guestTabList } from "./TabsList";
import Header from "../../../../../../components/Header";
import CBreadcrumbs from "../../../../../../components/CElements/CBreadcrumbs";
import { useMemo, useState } from "react";
import GuestVisitReportPage from "./Pages/VisitReport";
import GuestUpDownGradePage from "./Pages/UpOrDowngreade";
export default function GuestPage() {
  const [currentTab, setCurrentTab] = useState({ index: 0 });
  const breadCrumbItems = [
    {
      label: "Гость",
    },
  ];

  const CurrentPage = useMemo(() => {
    switch (currentTab?.slug) {
      case "upgrade_downgrade":
        return <GuestUpDownGradePage />;
      default:
        return <GuestVisitReportPage />;
    }
  }, [currentTab]);

  return (
    <>
      <Header title="Muhammad Aziz">
        <CBreadcrumbs type="link" progmatic={true} items={breadCrumbItems} />
      </Header>
      <FormCard minHeight="70vh">
        <CTabs
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          tabList={guestTabList}
          passRouter={false}
        />
        {CurrentPage}
      </FormCard>
    </>
  );
}
