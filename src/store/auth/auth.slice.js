import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: null,
  token: {},
  sessions: null,
};

export const { actions: authActions, reducer: authReducer } = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.sessions = payload.sessions;
      state.isAuth = true;
    },
    setToken: (state, { payload }) => {},
    logout: (state) => initialState,
  },
});
