import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setItems } = paginationSlice.actions;
export default paginationSlice.reducer;
