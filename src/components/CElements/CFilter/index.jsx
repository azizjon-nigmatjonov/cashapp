import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";
import "./style.scss";
import {
  ClearRounded,
  KeyboardArrowUpRounded,
  KeyboardArrowDownRounded,
} from "@mui/icons-material";
import { FilterIcon } from "../../IconPicker/svg";
import OptimizeQuery from "../../../utils/optimizeQuery";

export default function CFilter({
  up = "up",
  down = "down",
  currentSort = "",
  passRouter = true,
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queries = Object.fromEntries(searchParams.entries());
  const location = useLocation();
  const pathname = location.pathname;
  const handleSort = useDebounce((status) => {
    const prmt = { sort: status === currentSort ? "" : status };

    handleRouteActions(prmt);
  }, 0);

  const handleClearFilter = () => {
    const prmt = {
      sort: "",
    };

    handleRouteActions(prmt);
  };

  function handleRouteActions(queryObj) {
    if (!passRouter) {
      return;
    }
    const newQuery = {
      ...queries,
      ...queryObj,
    };

    const queryParams = createSearchParams(OptimizeQuery(newQuery));
    navigate({
      pathname: pathname,
      search: queryParams.toString(),
    });
  }

  return (
    <div className="CFilter">
      {(currentSort === up || currentSort === down) && (
        <div className="clear">
          <ClearRounded
            onClick={handleClearFilter}
            style={{ color: "#8B99AF", cursor: "pointer" }}
          />
        </div>
      )}
      <div className="arrow">
        <KeyboardArrowUpRounded
          onClick={() => handleSort(up)}
          style={{
            color: currentSort === up ? "#d95c35" : "#8B99AF",
            zIndex: currentSort === down ? "3" : "0",
          }}
          className="up"
        />
        <KeyboardArrowDownRounded
          onClick={() => handleSort(down)}
          style={{
            color: currentSort === down ? "#d95c35" : "#8B99AF",
            zIndex: currentSort === down ? "3" : "0",
          }}
          className="down"
        />
      </div>
      {/* <div className="clear">
        {queries[type + "_sort"] ? (
          <ClearRounded
            onClick={handleClearFilter}
            style={{ color: "#8B99AF" }}
          />
        ) : (
          <FilterIcon />
        )}
      </div> */}
    </div>
  );
}
