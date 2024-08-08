import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderData: [],
  userOrderData: [],
  orderLoading: false,
  orderSuccess: null,
  orderError: null,
  deleteOrder: null
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderReq: (state, action) => {
      state.orderLoading = true;
      state.orderSuccess = null;
      state.orderError = null;
    },

    orderFetch: (state, action) => {
      state.orderLoading = false;
      state.orderData = action.payload;
    },
    orderById: (state, action) => {
      state.orderLoading = false;
      state.userOrderData = action.payload;
    },
    orderSuccess: (state, action) => {
      state.orderLoading = false;
      state.orderSuccess = action.payload;
    },
    orderFail: (state, action) => {
      state.orderLoading = false;
      state.orderSuccess = null;
      state.orderError = action.payload;
    },
    deleteOrderSuccess: (state, action) => {
      state.orderLoading = false;
      state.deleteOrder = action.payload;
      state.orderError = null;
    },
   
  },
});

export const {
  orderReq,
  orderById,
  orderFetch,
  orderSuccess,
  orderFail,
  deleteOrderSuccess,
} = orderSlice.actions;
export default orderSlice.reducer;
