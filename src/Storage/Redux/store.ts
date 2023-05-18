import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./MenuItemSlice";
import { menuItemApi, shoppingCartApi } from "../../apis";
import { shoppingCartReducer } from "./ShoppingCartSlice";

const store = configureStore({
  reducer: {
    menuItemReducer: menuItemReducer,
    shoppingCartStore: shoppingCartReducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(menuItemApi.middleware)
      .concat(shoppingCartApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
