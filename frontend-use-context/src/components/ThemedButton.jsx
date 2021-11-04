import { useContext } from "react";
import { StateContext } from "../App";

function ThemedButton() {
  const { styles: theme } = useContext(StateContext);
  console.log("[ThemedButton]", theme);

  return (
    <div
      style={{
        background: theme.background,
        color: theme.foreground,
        marginTop: 40,
        padding: 10,
      }}
    >
      I am styled by theme context!
    </div>
  );
}

export default ThemedButton;
