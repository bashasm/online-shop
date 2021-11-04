import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { addTocart } from "../features/cartSlice";
import { useGetAllProductsQuery } from "../features/productsApi";

function Home() {
  const { data, isError, isFetching } = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const history = useHistory();

  function onAdd(product) {
    dispatch(addTocart(product));
    history.push("/cart");
  }

  return (
    <div className="home-container">
      {isFetching && <p>Loading....</p>}
      {isError && <p>Error while loading data....</p>}
      {data && (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {data.map((product) => (
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
