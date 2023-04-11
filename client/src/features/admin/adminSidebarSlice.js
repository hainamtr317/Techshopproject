import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  openSubMenuItem: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.open = !state.open;
    },
    openSubMenu: (state) => {
      state.openSubMenuItem = !state.openSubMenuItem;
    },
  },
});

export const { openSidebar, openSubMenu } = sidebarSlice.actions;
export default sidebarSlice.reducer;
