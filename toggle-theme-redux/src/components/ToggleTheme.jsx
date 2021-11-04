import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../features/themeSlice";

function ToggleTheme() {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  console.log("[ToggleTheme]", theme);

  function onToggle() {
    dispatch(toggle());
  }
  return <button onClick={onToggle}>ToggleTheme</button>;
}

export default ToggleTheme;
