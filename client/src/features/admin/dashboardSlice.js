import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../configs/axiosConfig";

export const getTopSaleNumbers = createAsyncThunk(
  "dashboard/getTopSaleNumbers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(`/api/dashboard/getTopSaleNumbers`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getYearlyOrders = createAsyncThunk(
  "dashboard/getYearlyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(`/api/dashboard/getYearlyOrders`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMonthlyOrders = createAsyncThunk(
  "dashboard/getMonthlyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(`/api/dashboard/getMonthlyOrders`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTotalOrdersAndNewlyAddedOrders = createAsyncThunk(
  "dashboard/getTotalOrdersAndNewlyAddedOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(
        `api/dashboard/getTotalOrdersAndNewlyAddedOrders`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  isTopSaleLoading: false,
  isLineChartLoading: false,
  isTotalOrdersAndNewlyAddedOrders: false,
  isUnitMode: true,
  isRevenueMode: false,
  errorMessage: "",
  topSellingList: [],
  totalOrdersAndNewlyAddedOrders: {},
  lineChartData: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    toggleUnitMode: (state, action) => {
      state.isUnitMode = true;
      state.isRevenueMode = false;
    },
    toggleRevenueMode: (state, action) => {
      state.isUnitMode = false;
      state.isRevenueMode = true;
    },
  },
  extraReducers: (build) => {
    build.addCase(getTopSaleNumbers.fulfilled, (state, action) => {
      state.isTopSaleLoading = false;
      state.topSellingList = action.payload.orderedList;
    });

    build.addCase(getTopSaleNumbers.pending, (state, action) => {
      state.isTopSaleLoading = true;
    });

    build.addCase(getTopSaleNumbers.rejected, (state, action) => {
      state.isTopSaleLoading = false;
      state.errorMessage = action.payload.message;
    });

    build.addCase(
      getTotalOrdersAndNewlyAddedOrders.fulfilled,
      (state, action) => {
        state.isTotalOrdersAndNewlyAddedOrders = false;
        state.totalOrdersAndNewlyAddedOrders = action.payload;
      }
    );

    build.addCase(
      getTotalOrdersAndNewlyAddedOrders.pending,
      (state, action) => {
        state.isTotalOrdersAndNewlyAddedOrders = true;
      }
    );

    build.addCase(
      getTotalOrdersAndNewlyAddedOrders.rejected,
      (state, action) => {
        state.isTotalOrdersAndNewlyAddedOrders = false;
        state.errorMessage = action.payload.message;
      }
    );

    build.addCase(getYearlyOrders.fulfilled, (state, action) => {
      state.isLineChartLoading = false;
      state.lineChartData = action.payload.results;
    });

    build.addCase(getYearlyOrders.pending, (state, action) => {
      state.isLineChartLoading = true;
    });

    build.addCase(getYearlyOrders.rejected, (state, action) => {
      state.isLineChartLoading = false;
      state.errorMessage = action.payload.message;
    });

    build.addCase(getMonthlyOrders.fulfilled, (state, action) => {
      state.isLineChartLoading = false;
      state.lineChartData = action.payload.results;
    });

    build.addCase(getMonthlyOrders.pending, (state, action) => {
      state.isLineChartLoading = true;
    });

    build.addCase(getMonthlyOrders.rejected, (state, action) => {
      state.isLineChartLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});
export const { toggleRevenueMode, toggleUnitMode } = dashboardSlice.actions;
export default dashboardSlice.reducer;
