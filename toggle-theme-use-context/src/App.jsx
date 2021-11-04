import ToggleTheme from "./components/ToggleTheme.jsx";
import Toolbar from "./components/Toolbar.jsx";
import GlobalState from "./context/GlobalState.jsx";

function App() {
  console.log("[App]");

  return (
    <GlobalState>
      <ToggleTheme />
      <Toolbar />
    </GlobalState>
  );
}

export default App;
