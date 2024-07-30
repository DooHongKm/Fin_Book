// import
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import idReducer from "./id";
import pwReducer from "./pw";
import yearReducer from "./year";
import monthReducer from "./month";
import dateReducer from "./date";
import showCostReducer from "./showCost";
import listIndexReducer from "./listIndex";

// reducer(persist)
const rootReducer = combineReducers({
  id: idReducer,
  pw: pwReducer,
  year: yearReducer,
  month: monthReducer,
  date: dateReducer,
  showCost: showCostReducer,
  listIndex: listIndexReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['id', 'year', 'month', 'date']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// store
const store = configureStore({
  reducer: persistedReducer,
});

// export
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
