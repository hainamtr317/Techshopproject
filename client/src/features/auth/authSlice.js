import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../configs/axiosConfig";

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post("/api/auth/register", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (_, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const { data } = await Axios.get("/api/user/getLogged", config);
      return data;
    } catch (error) {
      localStorage.removeItem("authToken");
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  isLoading: true,
  isSuccess: {},
  errorMessage: "",
  isLogin: false,
  loggedUser: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedUser: (state, action) => {
      state.loggedUser = action.payload;
      state.isLoading = false;
      state.isLogin = true;
    },
    reset: () => initialState,
  },
  extraReducers: (build) => {
    build.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = action.payload;
    });

    build.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });

    build.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.error;
    });

    build.addCase(verifyToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.loggedUser = action.payload;
      state.isLogin = true;
    });

    build.addCase(verifyToken.pending, (state, action) => {
      state.isLoading = true;
    });

    build.addCase(verifyToken.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.error;
    });
  },
});

export const { setLoggedUser, reset } = authSlice.actions;
export default authSlice.reducer;
