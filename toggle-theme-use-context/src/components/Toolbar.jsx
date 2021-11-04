import { useContext } from "react";
import { StateContext } from "../context/GlobalState.jsx";
import ThemedButton from "./ThemedButton.jsx";

function Toolbar() {
  console.log("[Toolbar]");
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

export default Toolbar;
