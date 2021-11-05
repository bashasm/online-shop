import { toast } from "react-toastify";
import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
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

function getUpdateCounts(state) {
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
  const index = state.items.findIndex((item) => item.id === action.payload.id);
  const items = [...state.items];
  if (index >= 0) {
    items[index].quantity += 1;
    toast.info(`increased ${items[index].name} cart quantity`, {
      position: "bottom-left",
    });
  } else {
    const temp = { ...action.payload, quantity: 1 };
    items.push(temp);
    toast.info(`added ${action.payload.name} to cart`, {
      position: "bottom-left",
    });
  }

  const newState = {
    ...state,
    items,
  };
  // update counts
  const { totalQuantity, totalAmount } = getUpdateCounts(newState);
  return {
    ...newState,
    totalQuantity,
    totalAmount,
  };
}

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
  const { totalQuantity, totalAmount } = getUpdateCounts(newState);
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
  updateLocalStorage(newState);
  return newState;
}

function removeFromCart(state, action) {
  const newState = {
    ...state,
    items: state.items.filter((item) => item.id !== action.payload.id),
  };

  toast.error(`${action.payload.name} removed from cart`, {
    position: "bottom-left",
  });

  // update counts
  const { totalQuantity, totalAmount } = getUpdateCounts(newState);

  return {
    ...newState,
    totalQuantity,
    totalAmount,
  };
}

export default function reducer(state, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return addTocart(state, action);

    case UPDATE_QUANTITY:
      return updateQuantity(state, action);

    case CLEAR_CART:
      return clearCart(state, action);

    case REMOVE_FROM_CART:
      return removeFromCart(state, action);

    default:
      return state;
  }
}
