import { createSlice } from "@reduxjs/toolkit";
import { cartItemInterface, shoppingCartInterface } from "../../Interfaces";

const initalState: shoppingCartInterface = {
  cartItems: [],
};

export const ShoppingCartSlice = createSlice({
  name: "cartItems",
  initialState: initalState,
  reducers: {
    setShoppingCart: (state, action) => {
      state.cartItems = action.payload;
    },
    updateQuantity: (state, action) => {
      //payload - cartitem that needs to be updated, newquantity
      state.cartItems = state.cartItems?.map((item) => {
        if (item.id === action.payload.cartItem.id) {
          item.quantity = action.payload.quantity;
        }
        return item;
      });
    },
    removeFromCart: (state, action) => {
      //payload - cartitem that needs to be updated, newquantity
      state.cartItems = state.cartItems?.filter((item) => {
        if (item.id === action.payload.cartItem.id) {
          return null;
        }
        return item;
      });
    },
  },
});

export const { setShoppingCart, updateQuantity, removeFromCart } =
  ShoppingCartSlice.actions;
export const shoppingCartReducer = ShoppingCartSlice.reducer;
