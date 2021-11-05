import { toast } from "react-toastify";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  CLEAR_CART,
} from "../actions/cart";

const cartDataLS =
  localStorage.getItem("cartData") &&
  JSON.parse(localStorage.getItem("cartData"));

export const cartInitialState = {
  items: cartDataLS?.items || [],
  totalQuantity: cartDataLS?.totalQuantity || 0,
  totalAmount: cartDataLS?.totalAmount || 0,
};

function updateLocalStorage(state) {
  localStorage.setItem("cartData", JSON.stringify(state));
}

function getUpdatedCounts(state) {
  const { totalQuantity, totalAmount } = state.items.reduce(
    (prev, curr) => ({
      totalQuantity: prev.totalQuantity + curr.quantity,
      totalAmount: prev.totalAmount + curr.quantity * curr.price,
    }),
    { totalQuantity: 0, totalAmount: 0 }
  );

  updateLocalStorage({
    ...state,
    totalQuantity,
    totalAmount,
  });
  return { totalQuantity, totalAmount };
}

function addTocart(state, action) {
  let newState = {
    ...state,
  };

  const itemFound = state.items.find((item) => item.id === action.payload.id);

  if (itemFound) {
    itemFound.quantity = itemFound.quantity + 1;
    toast.info(`increased quantity ${action.payload.name} in cart`, {
      position: "bottom-left",
    });
  } else {
    newState.items = [...state.items, { ...action.payload, quantity: 1 }];
    toast.info(`added ${action.payload.name} to cart`, {
      position: "bottom-left",
    });
  }

  // update counts
  const { totalQuantity, totalAmount } = getUpdatedCounts(newState);

  return {
    ...newState,
    totalQuantity,
    totalAmount,
  };
}

function removeFromCart(state, action) {
  const newState = {
    ...state,
    items: state.items.filter((item) => item.id !== action.payload.id),
  };

  // update counts
  const { totalQuantity, totalAmount } = getUpdatedCounts(newState);

  toast.error(`${action.payload.name} removed from cart`, {
    position: "bottom-left",
  });

  return {
    ...newState,
    totalQuantity,
    totalAmount,
  };
}

// to add or remove quantity of the cart item
function updateQuantity(state, action) {
  const { isAdd, product } = action.payload;
  const newState = {
    ...state,
    items: state.items
      .map((item) => {
        if (item.id === product.id) {
          if (isAdd) {
            item.quantity++;
          } else {
            item.quantity = Math.max(0, item.quantity - 1);
            if (item.quantity === 0) {
              toast.error(`${item.name} removed from cart`, {
                position: "bottom-left",
              });
              return null;
            }
          }
        }
        return item;
      })
      // filter out nulls
      .filter((item) => item !== null),
  };

  // update counts
  const { totalQuantity, totalAmount } = getUpdatedCounts(newState);

  return {
    ...newState,
    totalQuantity,
    totalAmount,
  };
}

function clearCart(state, action) {
  const newState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  };
  toast.error(`cart cleared`, {
    position: "bottom-left",
  });
  updateLocalStorage(newState);
  return newState;
}

export default (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return addTocart(state, action);
    case REMOVE_FROM_CART:
      return removeFromCart(state, action);
    case UPDATE_QUANTITY:
      return updateQuantity(state, action);
    case CLEAR_CART:
      return clearCart(state, action);
    default:
      return state;
  }
};
