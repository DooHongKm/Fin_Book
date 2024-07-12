import { configureStore } from "@reduxjs/toolkit";
import idState from "./id";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    id: idState,
  },
});

export default store;
