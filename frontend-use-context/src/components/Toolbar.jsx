import { useContext } from "react";
import { StateContext } from "../App.jsx";
import ThemedButton from "./ThemedButton.jsx";

function Toolbar() {
  const { theme } = useContext(StateContext);
  console.log("[Toolbar]", theme);
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

export default Toolbar;
