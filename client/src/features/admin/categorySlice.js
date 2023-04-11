import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../configs/axiosConfig";

export const addCategory = createAsyncThunk(
  "category/post",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post("/api/category/add", data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCategories = createAsyncThunk(
  "category/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get("/api/category/q");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (category_id, thunkAPI) => {
    try {
      const response = await Axios.delete(
        `/api/category/delete/${category_id}`,
        category_id
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getCategory = createAsyncThunk(
  "category/getOne",
  async (category_id, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(`/api/category/q/${category_id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async (data, thunkAPI) => {
    try {
      const response = await Axios.put(
        `/api/category/update/${data._id}`,
        data
      );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  isLoading: false,
  errorMessage: "",
  categories: [],
  category: {},
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(addCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories.push(action.payload);
    });

    build.addCase(addCategory.pending, (state, action) => {
      state.isLoading = true;
    });

    build.addCase(addCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });

    build.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload.data;
    });

    build.addCase(getCategories.pending, (state, action) => {
      state.isLoading = true;
    });

    build.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });

    build.addCase(deleteCategory.pending, (state, action) => {
      state.isLoading = true;
    });

    build.addCase(deleteCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload._id
      );
    });

    build.addCase(deleteCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });

    build.addCase(updateCategory.pending, (state, action) => {
      state.isLoading = true;
    });

    build.addCase(getCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.category = action.payload;
    });

    build.addCase(updateCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.categories.findIndex(
        (category) => category._id === action.payload._id
      );
      state.categories[index] = {
        ...state.categories[index],
        ...action.payload,
      };
    });
  },
});

export default categorySlice.reducer;
