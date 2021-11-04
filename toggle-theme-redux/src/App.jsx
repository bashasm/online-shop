import { Provider } from "react-redux";
import ToggleTheme from "./components/ToggleTheme.jsx";
import Toolbar from "./components/Toolbar.jsx";
import store from "./store.js";

function App() {
  console.log("[App]");

  return (
    <Provider store={store}>
      <ToggleTheme />
      <Toolbar />
    </Provider>
  );
}

export default App;
