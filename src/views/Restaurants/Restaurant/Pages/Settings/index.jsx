import FormCard from "../../../../../components/FormCard";
import Header from "../../../../../components/Header";
import CBreadcrumbs from "../../../../../components/CElements/CBreadcrumbs";
import CTabs from "../../../../../components/CElements/CTab";
import { tabList } from "./tabList";
import GuestSettingsRank from "./Rank";
import { useMemo, useState } from "react";
import RestaurantSettingsCategory from "./Category";
import RestaurantSettingsMenuTypes from "./MenuTypes";
import CreateButton from "../../../../../components/Buttons/CreateButton";
import usePageRouter from "../../../../../hooks/useObjectRouter";
import { useGetQueries } from "../../../../../hooks/useQueries";
import { useParams } from "react-router-dom";

export default function RestaurantSettingsPage() {
  const { currentTab } = useGetQueries();
  const [currentText, setCurrentText] = useState("");
  const { restaurant_id } = useParams();
  const { navigateTo } = usePageRouter();
  function handleTabClick() {}

  const CurrentPageUI = useMemo(() => {
    switch (currentTab) {
      case "category":
        setCurrentText("Категория");
        return <RestaurantSettingsCategory currentTab={currentTab} />;
      case "menu-types":
        setCurrentText("Виды меню");
        return <RestaurantSettingsMenuTypes currentTab={currentTab} />;
      default:
        setCurrentText("Ранк");
        return <GuestSettingsRank />;
    }
  }, [currentTab]);

  const ExtraElement = useMemo(() => {
    switch (currentTab) {
      case "category":
        return <CreateButton onClick={() => navigateTo("category/create")} />;
      default:
        return;
    }
  }, [currentTab, navigateTo]);

  const breadCrumbItems = useMemo(() => {
    return [
      {
        label: "Ресторан",
        link: `/object/restaurant/${restaurant_id}`,
      },
      {
        label: currentText,
      },
    ];
  }, [currentText, restaurant_id]);

  return (
    <>
      <Header title="Настройки" extraButtons={currentTab === 1}>
        <CBreadcrumbs items={breadCrumbItems} type="link" progmatic={true} />
      </Header>

      <FormCard>
        <CTabs
          tabList={tabList}
          handleTabClick={handleTabClick}
          passRouter={true}
          extra={ExtraElement}
        />
        {CurrentPageUI}
      </FormCard>
    </>
  );
}
