import { GET_PRODUCTS } from "../actions/products";

export const productsInitialState = { items: [], status: null };

export default function reducer(state, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      state.items = action.payload;
      return;
    default:
      return state;
  }
}
