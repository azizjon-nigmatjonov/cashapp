import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import ChildLayout from "../layouts/ChildLayout";
import Login from "../views/Auth/Login";
import Registration from "../views/Auth/Registration";
import DashboardPage from "../views/Dashboard";
import OrganizationsPage from "../views/Organizations";
import RestaurantsPage from "../views/Restaurants";
import RestaurantPage from "../views/Restaurants/Restaurant";
import GuestPage from "../views/Restaurants/Restaurant/Pages/Guests/Guest";
import ReportsPage from "../views/Reports";
import AdminsPage from "../views/Settings/Admin";
import PermissionPage from "../views/Settings/Permission";
import RolesPage from "../views/Settings/Roles";
import RestaurantCreate from "../views/Restaurants/Create";
import RestaurantMenuCreate from "../views/Restaurants/Restaurant/Pages/Menu/Create";
import RestaurantSettingsPage from "../views/Restaurants/Restaurant/Pages/Settings";
import OrganizationCreate from "../views/Organizations/Create";
import CategoryCreate from "../views/Restaurants/Restaurant/Pages/Settings/Category/Create";
import PermissionUpdate from "../views/Settings/Permission/Update";
import AdminUpdate from "../views/Settings/Admin/Update";
import RoleUpdate from "../views/Settings/Roles/Update";
import RoleCreate from "../views/Settings/Roles/Create";
import EmployeePage from "../views/Restaurants/Restaurant/Pages/Employees/Employee";

import Products from "../views/Restaurants/Restaurant/Pages/Settings/MenuTypes/Products";
import ProductCreate from "../views/Restaurants/Restaurant/Pages/Settings/MenuTypes/Products/Product/Create";
import { useEffect, useState } from "react";
import { websiteActions } from "../store/website/website.slice";

const Router = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [list, setList] = useState([]);
  const [routes, setRoutes] = useState([]);

  function getPath(path, child = {}) {
    let newPath = "/object/" + path;
    let childPath = "";
    if (child?.parent) {
      newPath = "/object/" + child.parent;
      childPath = `/object/${child.parent}/child/${path}`;
    }

    let obj = {
      id: newPath,
      permission: newPath,
      title: newPath,
      children: [],
    };
    if (childPath) {
      obj.child = {
        id: childPath,
        permission: childPath,
        title: childPath,
      };
    }

    if (!list?.includes(newPath)) {
      setRoutes((prev) => [...prev, obj]);
      setList((prev) => [...prev, childPath?.id ? childPath : newPath]);
    }
    return childPath ? childPath : newPath;
  }

  useEffect(() => {
    if (!routes?.length) return;
    let mergedObjects = {};

    routes?.forEach((object) => {
      if (mergedObjects[object.permission]) {
        mergedObjects[object.permission].children.push(object.child);
      } else {
        mergedObjects[object.permission] = {
          id: object.id,
          permission: object.permission,
          title: object.title,
          children: [object.child],
        };
      }
    });

    mergedObjects = Object.values(mergedObjects);

    dispatch(websiteActions.setPermissions({ list: mergedObjects }));
  }, [routes]);

  if (!isAuth)
    return (
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Navigate to="/login " />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to={getPath("dashboard")} />} />
        <Route path={getPath("dashboard")} element={<DashboardPage />} />

        <Route
          path={getPath("organizations")}
          element={<OrganizationsPage />}
        />

        <Route
          path={getPath("organization/create")}
          element={<OrganizationCreate />}
        />
        <Route
          path={getPath("organization/update/:id")}
          element={<OrganizationCreate />}
        />

        <Route path={getPath("restaurants")} element={<RestaurantsPage />} />
        <Route path={getPath("restaurant/:id")} element={<RestaurantPage />} />
        <Route
          path={getPath("restaurant/create")}
          element={<RestaurantCreate />}
        />
        <Route
          path={getPath("restaurant/update/:id")}
          element={<RestaurantCreate />}
        />

        <Route
          path={getPath("restaurant/settings/:restaurant_id")}
          element={<RestaurantSettingsPage />}
        />

        <Route
          path={getPath("employee/:employee_id")}
          element={<EmployeePage />}
        />

        <Route path={getPath("category/create")} element={<CategoryCreate />} />
        <Route
          path={getPath("category/update/:categoryId")}
          element={<CategoryCreate />}
        />

        <Route path={getPath("guest/:id")} element={<GuestPage />} />

        <Route
          path={getPath("menu/create")}
          element={<RestaurantMenuCreate />}
        />
        <Route
          path={getPath("menu/update/:menuId")}
          element={<RestaurantMenuCreate />}
        />

        <Route path={getPath("products/:menu_id")} element={<Products />} />
        <Route
          path={getPath("product/create/:menu_id")}
          element={<ProductCreate />}
        />
        <Route
          path={getPath("product/:product_id/:menu_id")}
          element={<ProductCreate />}
        />

        <Route path={getPath("reports")} element={<ReportsPage />}></Route>

        <Route path="*" element={<Navigate to={getPath("dashboard")} />} />
      </Route>

      {/* child routes */}

      <Route path={getPath("settings")} element={<ChildLayout />}>
        <Route index element={<Navigate to={"child/admin"} />} />
        <Route
          path={getPath("permissions", {
            parent: "settings",
          })}
          element={<PermissionPage />}
        />
        <Route
          path={getPath("admin", { parent: "settings" })}
          element={<AdminsPage />}
        />
        <Route
          path={getPath("roles", { parent: "settings" })}
          element={<RolesPage />}
        />
        <Route
          path={getPath("permissions/:id", { parent: "settings" })}
          element={<PermissionUpdate />}
        />
        <Route
          path={getPath("admin/:id", { parent: "settings" })}
          element={<AdminUpdate />}
        />
        <Route
          path={getPath("admin/create", { parent: "settings" })}
          element={<AdminUpdate />}
        />
        <Route
          path={getPath("roles/:id", { parent: "settings" })}
          element={<RoleUpdate />}
        />
        <Route
          path={getPath("roles/create", { parent: "settings" })}
          element={<RoleCreate />}
        />
        <Route path="*" element={<Navigate to={"child/admin"} />} />
      </Route>
    </Routes>
  );
};

export default Router;
