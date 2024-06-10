import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import { alertReducer } from "./alert/alert.slice";
import { authReducer } from "./auth/auth.slice";
import storage from "redux-persist/lib/storage";
import { constructorTableReducer } from "./constructorTable/constructorTable.slice";
import { websiteReducer } from "./website/website.slice";
import { tableSizeReducer } from "./tableSize/tableSizeSlice";

const authPersistConfig = {
  key: "auth",
  storage,
};

const constructorTablePersistConfig = {
  key: "constructorTable",
  storage,
};

const tableSizePersistConfig = {
  key: "tableSize",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  constructorTable: persistReducer(
    constructorTablePersistConfig,
    constructorTableReducer
  ),
  tableSize: persistReducer(tableSizePersistConfig, tableSizeReducer),
  alert: alertReducer,
  website: websiteReducer,
});

export default rootReducer;
