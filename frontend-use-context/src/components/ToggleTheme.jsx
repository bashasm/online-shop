import { useContext } from "react";
import { DispatchContext, StateContext } from "../App";

function ToggleTheme() {
  const { theme } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  console.log("[ToggleTheme]", theme);

  function toggle() {
    dispatch(theme);
  }
  return <button onClick={toggle}>ToggleTheme</button>;
}

export default ToggleTheme;
