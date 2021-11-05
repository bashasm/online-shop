export const GET_PRODUCTS = "GET_PRODUCTS";

// action creator
export function getProducts(payload) {
  return {
    type: GET_PRODUCTS,
    payload,
  };
}
