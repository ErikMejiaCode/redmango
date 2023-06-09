import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./MenuItemSlice";
import { authApi, menuItemApi, paymentApi, shoppingCartApi } from "../../apis";
import { shoppingCartReducer } from "./ShoppingCartSlice";
import { userAuthReducer } from "./UserAuthSlice";

const store = configureStore({
  reducer: {
    menuItemStore: menuItemReducer,
    shoppingCartStore: shoppingCartReducer,
    userAuthStore: userAuthReducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(menuItemApi.middleware)
      .concat(authApi.middleware)
      .concat(shoppingCartApi.middleware)
      .concat(paymentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
