export const GET_PRODUCTS = "GET_PRODUCTS";

export const getProducts = (payload) => {
  return {
    type: GET_PRODUCTS,
    payload,
  };
};
