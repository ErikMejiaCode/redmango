import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./MenuItemSlice";

const store = configureStore({
  reducer: {
    menuItemReducer: menuItemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
