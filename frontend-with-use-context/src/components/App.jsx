import { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProducts } from "../context/actions/products";
import { DispatchContext } from "../context/GlobalState";
import "./App.css";
import Cart from "./Cart";
import Home from "./Home";
import NavBar from "./NavBar";
import NotFound from "./NotFound";

function App() {
  const dispatch = useContext(DispatchContext);
  const getUsers = async () => {
    const products = await fetch("http://localhost:5000/products").then((res) =>
      res.json()
    );
    // LOAD USERS
    dispatch(getProducts(products));
  };

  useEffect(() => {
    getUsers();
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
