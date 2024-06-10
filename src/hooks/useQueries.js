import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useGetQueries = () => {
  const [searchParams] = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  const params = useMemo(() => {
    const result = {};
    result.currentLimit = query?.limit ? parseInt(query.limit) : 10;
    result.currentPage = query?.page ? parseInt(query.page) : 1;
    result.search = query?.search ? query.search : undefined;
    result.currentTab = query?.tab ? query.tab : undefined;
    result.restaurant_id = query?.restaurant_id;
    result.currentSort = query?.sort
    return result;
  }, [query]);

  return params;
};
