import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logoutModal: {},
  permissions: {},
  routes: [],
};

export const { actions: websiteActions, reducer: websiteReducer } = createSlice(
  {
    name: "website",
    initialState,
    reducers: {
      setLogoutModal: (state, { payload }) => {
        state.logoutModal = payload;
      },
      setPermissions: (state, { payload }) => {
        state.permissions = payload;
      },
      setRoutes: (state, { payload }) => {
        state.routes = payload;
      },
    },
  }
);
