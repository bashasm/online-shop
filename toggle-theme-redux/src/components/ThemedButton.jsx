import { useSelector } from "react-redux";

function ThemedButton() {
  const styles = useSelector((state) => state.styles);
  console.log("[ThemedButton]", styles);

  return (
    <div
      style={{
        background: styles.background,
        color: styles.foreground,
        marginTop: 40,
        padding: 10,
      }}
    >
      I am styled by theme context!
    </div>
  );
}

export default ThemedButton;
