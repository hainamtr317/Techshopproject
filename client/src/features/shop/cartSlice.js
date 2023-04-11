import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../configs/axiosConfig";

export const addToCart = createAsyncThunk(
  "cart/add",
  async (payload, { rejectWithValue }) => {
    try {
      await Axios.put("api/store/addToCart/", payload.input);
      return payload.item;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await Axios.delete("api/store/removeFromCart", {
        data: payload,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  isLoading: true,
  cart: [],
  totalQuantity: 0,
  totalAmount: 0,
  errorMessage: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setTotalAmount: (state) => {
      if (state.cart.length > 1) {
        state.totalAmount = state.cart.reduce((prev, current) => {
          return prev + current.quantity * current.price;
        }, 0);
      } else {
        state.totalAmount = state.cart[0].quantity * state.cart[0].price;
      }
    },
    setTotal: (state) => {
      if (state.cart.length > 1) {
        state.totalQuantity = state.cart.reduce((prev, current) => {
          return prev + current.quantity;
        }, 0);
      } else {
        state.totalQuantity = state.cart[0].quantity;
      }
    },
    resetAmount: (state) => {
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (build) => {
    build.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.cart.findIndex(
        (product) => product._id === action.payload._id
      );

      if (index !== -1) {
        state.cart[index].quantity += action.payload.quantity;
      }

      if (index === -1) {
        state.cart.push(action.payload);
      }
    });

    build.addCase(addToCart.pending, (state, action) => {
      state.isLoading = true;
    });

    build.addCase(addToCart.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });

    build.addCase(removeFromCart.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });

    build.addCase(removeFromCart.pending, (state, action) => {
      state.isLoading = true;
    });

    build.addCase(removeFromCart.fulfilled, (state, action) => {
      state.isLoading = false;

      state.cart = state.cart.filter(
        (product) => product._id !== action.payload.product_id
      );
    });
  },
});

export const { setCart, setTotal, setTotalAmount, resetAmount, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
