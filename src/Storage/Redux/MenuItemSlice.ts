import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  menuitem: [],
};

export const menuItemSlice = createSlice({
  name: "MenuItem",
  initialState: initalState,
  reducers: {
    setMenuItem: (state, action) => {
      state.menuitem = action.payload;
    },
  },
});

export const { setMenuItem } = menuItemSlice.actions;
export const menuItemReducer = menuItemSlice.reducer;
