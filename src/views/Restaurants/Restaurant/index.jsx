import FormCard from "../../../components/FormCard";
import Header from "../../../components/Header";
import RestaurantBanner from "./Banner";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import GuestsPage from "./Pages/Guests";
import RestaurantsEmployeesPage from "./Pages/Employees";
import RestaurantMenuPage from "./Pages/Menu";
import CTabs from "../../../components/CElements/CTab";
import { tabList } from "./TabsList";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { useQuery } from "react-query";
import branchService from "../../../services/branchService";
import { useTranslation } from "react-i18next";
import { useGetQueries } from "../../../hooks/useQueries";
import RestaurantCashbackPage from "./Pages/Cashback";
import SearchInput from "../../../components/SearchInput";
import CDatePicker from "../../../components/DatePickers/CDatePicker";
import RestaurantBonusPage from "./Pages/Bonus";
import cls from "./style.module.scss";
import CreateButton from "../../../components/Buttons/CreateButton";
import usePageRouter from "../../../hooks/useObjectRouter";

export default function RestaurantPage() {
  const { currentTab } = useGetQueries();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { navigateTo } = usePageRouter();
  const [currentText, setCurrentText] = useState("");
  const { id } = useParams();

  const { data: branch } = useQuery(
    ["GET_BRANCH_BY_ID", id],
    () => {
      return branchService.getBranch(id);
    },
    {
      enabled: !!id,
    }
  );

  function handleTabClick(element) {
    if (element.slug === "settings") {
      setTimeout(() => {
        navigate(`/object/restaurant/settings/${id}`);
      }, 0);
    }
  }

  const CurrentPage = useMemo(() => {
    switch (currentTab) {
      case "cashback":
        return <RestaurantCashbackPage currentTab={currentTab} />;
      case "employees":
        setCurrentText("Список сотрудников");
        return <RestaurantsEmployeesPage currentTab={currentTab} />;
      case "menu":
        setCurrentText("Список названий блюд");
        return <RestaurantMenuPage currentTab={currentTab} />;
      case "bonus":
        setCurrentText("Бонусы");
        return <RestaurantBonusPage currentTab={currentTab} />;
      default:
        setCurrentText("Список гостей");
        return <GuestsPage currentTab={currentTab} />;
    }
  }, [currentTab]);

  useEffect(() => {
    if (currentTab === "settings") {
      navigate(-1);
    }
  }, []);

  const ExtraButton = useMemo(() => {
    switch (currentTab) {
      case "menu":
        return <CreateButton onClick={() => navigateTo(`menu/create`)} />;
      case "employees":
        return (
          <CreateButton
            title="Добавить сотрудника"
            onClick={() => navigateTo(`employee/create`)}
          />
        );
      default:
        return;
    }
  }, [currentTab, navigateTo]);

  const breadCrumbItems = useMemo(() => {
    const result = [
      {
        label: "Рестораны",
        link: "/object/restaurants",
      },
      {
        label: t(currentTab ?? "guests"),
      },
    ];
    if (currentText) result.splice(2, 0, { label: currentText });
    return result;
  }, [currentText, currentTab, t]);

  return (
    <>
      <Header title={branch?.name}>
        <CBreadcrumbs type="link" items={breadCrumbItems} />
      </Header>

      <FormCard padding="16px 16px 0 16px" innerPadding="0">
        <RestaurantBanner branch={branch ?? {}} />
      </FormCard>

      <FormCard minHeight="600px">
        <CTabs
          tabList={tabList}
          handleTabClick={handleTabClick}
          extra={ExtraButton}
        />
        <div className={cls.filters}>
          <SearchInput />

          {/* <CDatePicker name="date" /> */}
        </div>
        {CurrentPage}
      </FormCard>
    </>
  );
}
