import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";

import NavBar from "./NavBar";
import Cart from "./Cart";
import Home from "./Home";
import NotFound from "./NotFound";
import { useEffect } from "react";
import { productsFetch } from "../features/productsSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsFetch());
  }, []);

  return (
    <Router>
      <ToastContainer />
      <NavBar />
      <Switch>
        <Route path="/cart" exact component={Cart} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/" exact component={Home} />
        <Redirect to="/not-found" />
      </Switch>
    </Router>
  );
}

export default App;
