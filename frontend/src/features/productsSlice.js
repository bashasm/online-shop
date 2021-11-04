import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const productsFetch = createAsyncThunk("products", async () => {
  return await fetch("http://localhost:5000/products").then((res) =>
    res.json()
  );
});

const slice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: null,
  },
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.pa;
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export default slice.reducer;
