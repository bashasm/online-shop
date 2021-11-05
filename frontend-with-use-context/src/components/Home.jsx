import { useContext } from "react";
import { useHistory } from "react-router";
import { DispatchContext, StateContext } from "../context/GlobalState";
import { addTocart } from "../context/actions/cart";

function Home() {
  const dispatch = useContext(DispatchContext);
  const { productsState } = useContext(StateContext);

  console.log("[Home]", productsState);

  const history = useHistory();

  function onAdd(product) {
    dispatch(addTocart(product));
    history.push("/cart");
  }

  return (
    <div className="home-container">
      {productsState?.items && (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {productsState.items.map((product) => (
              <div key={product.id} className="product">
                <h3>{product.name}</h3>
                <img src={product.image} alt={product.name} />
                <div className="details">
                  <span>{product.desc}</span>
                  <span className="price">${product.price}</span>
                </div>
                <button onClick={() => onAdd(product)}>Add To Cart</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
