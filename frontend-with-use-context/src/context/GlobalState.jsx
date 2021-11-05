import { createContext, useCallback, useMemo } from "react";
import { useImmerReducer } from "use-immer";
import cartReducer, { cartInitialState } from "./reducers/cart";
import productsReducer, { productsInitialState } from "./reducers/products";

export const DispatchContext = createContext();
export const StateContext = createContext();

const GlobalState = ({ children }) => {
  const [cartState, cartDispatch] = useImmerReducer(
    cartReducer,
    cartInitialState
  );
  const [productsState, productsDispatch] = useImmerReducer(
    productsReducer,
    productsInitialState
  );

  const combineDispatch =
    (...dispatches) =>
    (action) =>
      dispatches.forEach((dispatch) => dispatch(action));

  // don't forget to memoize again
  const combinedDispatch = useCallback(
    combineDispatch(cartDispatch, productsDispatch),
    [cartDispatch, productsDispatch]
  );
  const combinedState = useMemo(
    () => ({ cartState, productsState }),
    [cartState, productsState]
  );

  console.log("GlobalState");
  const value = {};
  return (
    <DispatchContext.Provider value={combinedDispatch}>
      <StateContext.Provider value={combinedState}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default GlobalState;
