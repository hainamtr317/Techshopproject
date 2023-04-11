import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  updateOpen: false,
  updateData: null,
};

const modelSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.open = true;
    },
    closeModal: (state) => {
      state.open = false;
    },
    openUpdateModal: (state, action) => {
      state.updateData = action.payload;
      state.updateOpen = true;
    },
    closeUpdateModal: (state) => {
      state.updateOpen = false;
      state.updateData = null;
    },
  },
});

export const { openModal, closeModal, openUpdateModal, closeUpdateModal } =
  modelSlice.actions;
export default modelSlice.reducer;
