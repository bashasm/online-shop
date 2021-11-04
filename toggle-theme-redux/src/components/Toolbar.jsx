import { useContext } from "react";
import { useSelector } from "react-redux";
import ThemedButton from "./ThemedButton.jsx";

function Toolbar() {
  const theme = useSelector((state) => state.theme);
  console.log("[Toolbar]", theme);
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

export default Toolbar;
