import { useNavigate } from "react-router-dom";

export default function usePageRouter() {
  const navigate = useNavigate();

  const navigateTo = (path, routeSlug = "/object/", state) => {
    const link = routeSlug + path;

    if (state) {
      navigate(link, { state: state })
      return
    };
    navigate(link);
  };

  const navigateChildTo = (path, ParentPath,routeSlug = "/object/", childSlug = '/child/', state) => {
    const link = routeSlug + ParentPath + childSlug + path;

    if (state) {
      navigate(link, { state: state })
      return
    };
    navigate(link);
  };

  const progmatic = () => navigate(-1);

  return { navigateTo, navigateChildTo, progmatic };
}
