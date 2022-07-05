import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./userReducer";
import cartReducer from './cartReducer'
import orderReducer from './orderReducer'
import addressReducer from './addressReducer'

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartReducer", "userReducer"],
};

const rootReducer = combineReducers({ userReducer, cartReducer, orderReducer, addressReducer });

export default persistReducer(persistConfig, rootReducer);