import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import "./style.scss";
import useDebounce from "../../hooks/useDebounce";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useMemo } from "react";

const SearchInput = ({
  styles,
  defaultValue,
  autoComplete = "off",
  onChange = () => {},
  ...props
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());
  const location = useLocation();
  const pathname = location.pathname;

  const handleChange = useDebounce((value) => {
    const prmt = {};
    prmt.search = value;
    onChange(value);
    handleTypeActions(prmt);
  }, 500);

  function handleTypeActions(queryObj) {
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

  const defaultVal = useMemo(() => {
    if (query?.search) return query.search;
    if (defaultValue) return defaultValue;
    return "";
  }, [query, defaultValue]);

  return (
    <div className="searchInput">
      <TextField
        size="small"
        placeholder="Поиск..."
        onChange={(e) => handleChange(e.target.value)}
        style={{ ...styles }}
        defaultValue={defaultVal}
        autoComplete={autoComplete}
        {...props}
        InputProps={{
          startAdornment: (
            <InputAdornment style={{ marginRight: 10 }}>
              <Search style={{ color: "#8b99af" }} />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchInput;
