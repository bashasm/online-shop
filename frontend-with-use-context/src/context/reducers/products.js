import { GET_PRODUCTS } from "../actions/products";

export const productsInitialState = { items: [], status: null };

export default function reducer(state, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}
