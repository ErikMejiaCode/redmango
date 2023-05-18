import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  cartItems: [],
};

export const ShoppingCartSlice = createSlice({
  name: "cartItems",
  initialState: initalState,
  reducers: {
    setShoppingCart: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const { setShoppingCart } = ShoppingCartSlice.actions;
export const shoppingCartReducer = ShoppingCartSlice.reducer;
