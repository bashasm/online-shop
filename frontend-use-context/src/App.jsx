import { createContext, useReducer } from "react";
import Toolbar from "./components/Toolbar.jsx";
import ToggleTheme from "./components/ToggleTheme.jsx";
import themeReducer, { initialState } from "./reducers/themeReducer";

export const StateContext = createContext();
export const DispatchContext = createContext();

function App() {
  const [state, dispatch] = useReducer(themeReducer, initialState);
  console.log("[App]", state);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <ToggleTheme />
        <Toolbar />
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
