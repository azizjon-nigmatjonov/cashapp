import { useMemo } from "react";
import CTab from "./Details";
import cls from "./style.module.scss";
import {
  createSearchParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import CreateButton from "../../Buttons/CreateButton";

export default function CTabs({
  passRouter = true,
  currentTab = {},
  setCurrentTab = () => {},
  tabList = [],
  handleTabClick = () => {},
  extra,
}) {
  const location = useLocation();
  const pathname = location.pathname;
  const [searchParams] = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());
  const navigate = useNavigate();
  const optimizedTabList = useMemo(() => {
    return tabList?.map((i, index) => ({
      ...i,
      index,
    }));
  }, [tabList]);

  function handleTabAction(i) {
    handleTabClick(i);
    if (!passRouter) {
      setCurrentTab(i);
      return;
    }
    const newQuery = {
      // ...query,
      tab: i?.slug,
    };
    const queryParams = createSearchParams(newQuery);
    navigate({
      pathname: pathname,
      search: queryParams.toString(),
    });
  }

  const value = useMemo(() => {
    if (currentTab?.index) return currentTab.index;
    if (!query?.tab) return 0;
    const tab = optimizedTabList.find((tab) => tab.slug === query.tab);
    return tab?.index;
  }, [optimizedTabList, query, currentTab]);

  return (
    <div className={cls.wrapper}>
      <CTab
        value={value}
        setValue={setCurrentTab}
        tabList={optimizedTabList}
        handleCustomClick={handleTabAction}
      />
      {extra && <>{extra}</>}
    </div>
  );
}
