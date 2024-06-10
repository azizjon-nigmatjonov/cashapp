import styles from "./style.module.scss";
import { Collapse, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import UserAvatar from "../UserAvatar";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import useSidebarElements from "../../hooks/useSidebarElements";
import IconGenerator from "../IconPicker/IconGenerator";
import { LogoIcon } from "../IconPicker/svg";
import { KeyboardDoubleArrowLeft } from "@mui/icons-material";
import { websiteActions } from "../../store/website/website.slice";

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { elements } = useSidebarElements();

  const [rightBlockVisible, setRightBlockVisible] = useState(true);

  const selectedMenuItem = useMemo(() => {
    const activeElement = elements.find((el) => {
      if (location.pathname.includes(el.path)) return true;
      return el.children?.some((child) =>
        location.pathname.includes(child.path)
      );
    });

    return activeElement;
  }, [location.pathname]);

  const logout = () => {
    dispatch(websiteActions.setLogoutModal({ step: "logout" }));
  };

  useEffect(() => {
    if (selectedMenuItem?.children) setRightBlockVisible(true);
  }, [selectedMenuItem]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.leftSide}>
        <div
          className={styles.header}
          onClick={() => setRightBlockVisible((prev) => !prev)}
        >
          {/* <img src={companyLogo} alt="img" /> */}
          <LogoIcon />
        </div>

        <div className={styles.menuItemsBlock}>
          {elements.map((element) => (
            <Tooltip
              placement="right"
              followCursor
              key={element.id}
              title={element.title}
            >
              <NavLink
                key={element.id}
                to={element.path ?? element.children?.[0]?.path}
                className={`${styles.menuItem} ${
                  selectedMenuItem?.id === element.id ? styles.active : ""
                }`}
              >
                {typeof element.icon === "string" ? (
                  <IconGenerator icon={element.icon} />
                ) : (
                  <element.icon />
                )}
              </NavLink>
            </Tooltip>
          ))}
        </div>

        <div className={styles.footer}>
          {/* <div className={styles.menuItem}>
            <NotificationsIcon />
          </div>

          <div className={styles.menuItem}>
            <SettingsIcon />
          </div> */}

          <UserAvatar disableTooltip />

          <div className={styles.menuItem} onClick={logout}>
            <LogoutIcon />
          </div>
        </div>
      </div>

      <Collapse
        in={rightBlockVisible && selectedMenuItem?.children}
        orientation="horizontal"
        unmountOnExit
      >
        <div className={styles.rightSide}>
          <div className={styles.header}>
            <Typography className={styles.title} variant="h4">
              {selectedMenuItem?.title}
            </Typography>
            <div
              className={styles.closeButton}
              onClick={() => setRightBlockVisible(false)}
            >
              <KeyboardDoubleArrowLeft />
            </div>
          </div>

          <div className={styles.menuItemsBlock}>
            {selectedMenuItem?.children?.map((childMenuItem) => (
              <NavLink
                to={childMenuItem.path}
                key={childMenuItem.key}
                className={({ isActive }) =>
                  `${styles.menuItem} ${isActive ? styles.active : ""}`
                }
              >
                {typeof childMenuItem.icon === "string" ? (
                  <IconGenerator icon={childMenuItem.icon} />
                ) : (
                  <childMenuItem.icon />
                )}
                {childMenuItem.title}
              </NavLink>
            ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Sidebar;
