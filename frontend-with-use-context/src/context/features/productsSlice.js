import { createSlice } from "../helpers/createSlice";

export default () =>
  createSlice({
    name: "products",
    initialState: { items: [], status: null },
    reducers: {
      getProducts: (state, action) => {
        state.items = action.payload;
      },
    },
  });
