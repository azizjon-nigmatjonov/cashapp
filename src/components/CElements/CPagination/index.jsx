import { Pagination } from "@mui/material";
import PaginationLimits from "./Limit";
import { usePaginationCount } from "../../../hooks/usePaginationCount";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const customization = {
  "& .MuiButtonBase-root": {
    width: "30px",
    height: "30px",
    background: "#fff",
    border: "1px solid #e5e9eb",
    color: "#111",
    fontWeight: "500",
    borderRadius: "10px",
  },
  "& .Mui-disabled": {
    background: "#fff",

    "&.MuiPaginationItem-previousNext": {
      color: "#d95c35aa",
    },
  },
  "& .Mui-selected": {
    background: "#d95c35 !important",
    fontSize: "16px",
    color: "#fff",
    "&:hover": {
      background: "#d95c35 !important",
    },
  },
};
const CPagination = ({
  limit,
  limitCount,
  passRouter,
  currentPage,
  setCurrentPage,
  setCurrentLimit,
  ...props
}) => {
  const location = useLocation();
  const pathname = location.pathname;
  const [searchParams] = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());
  const count = usePaginationCount(props?.count, limit);
  const navigate = useNavigate();

  function handleRouteActions(queryObj) {
    if (queryObj?.limit) queryObj.page = 1;
    if (!passRouter) {
      if (queryObj?.page) setCurrentPage(queryObj.page);
      if (queryObj?.limit) setCurrentLimit(query.limit);
      return;
    }

    const newQuery = {
      ...query,
      ...queryObj,
    };
    const queryParams = createSearchParams(newQuery);
    navigate({
      pathname: pathname,
      search: queryParams.toString(),
    });
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "15px",
      }}
    >
      <PaginationLimits
        limit={limit}
        limitCount={limitCount}
        handleRouteActions={handleRouteActions}
      />
      <Pagination
        sx={customization}
        onChange={(e, val) => handleRouteActions({ page: val })}
        {...props}
        count={count}
        page={currentPage}
        defaultPage={currentPage}
      />
    </div>
  );
};

export default CPagination;
