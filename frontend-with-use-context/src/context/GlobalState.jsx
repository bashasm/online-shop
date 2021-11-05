import { createContext, useCallback, useMemo } from "react";
import cartSlice from "./features/cartSlice";
import productsSlice from "./features/productsSlice";

export const DispatchContext = createContext();
export const StateContext = createContext();
export const ActionsContext = createContext();

const GlobalState = ({ children }) => {
  const {
    state: cartState,
    dispatch: cartDispatch,
    actions: cartActions,
  } = cartSlice();
  const {
    state: productsState,
    dispatch: productsDispatch,
    actions: productsActions,
  } = productsSlice();

  const combineDispatch =
    (...dispatches) =>
    (action) =>
      dispatches.forEach((dispatch) => dispatch(action));

  // don't forget to memoize again
  const combinedDispatch = useCallback(
    combineDispatch(cartDispatch, productsDispatch),
    [cartDispatch, productsDispatch]
  );

  const actions = { ...productsActions, ...cartActions };

  const combinedState = useMemo(
    () => ({ cartState, productsState }),
    [cartState, productsState]
  );

  return (
    <DispatchContext.Provider value={combinedDispatch}>
      <StateContext.Provider value={combinedState}>
        <ActionsContext.Provider value={actions}>
          {children}
        </ActionsContext.Provider>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default GlobalState;
