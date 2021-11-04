import { createContext, memo, useMemo, useReducer } from "react";
import themReducer, { initialState } from "./themeReducer";

export const StateContext = createContext();
export const DispatchContext = createContext();

const GlobalState = ({ children }) => {
  const [{ theme, styles }, dispatch] = useReducer(themReducer, initialState);
  console.log("[GlobalState]");

  const value = {
    theme,
    styles,
  };

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={value}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default GlobalState;
