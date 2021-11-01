import React, { useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import Axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  const [{ basket }, dispatch] = useStateValue();

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((data) => {
      console.log(data);
      setProductList(data.data);
      console.log(productList);
    });
  }, []);

  return (
    <div>
      <div class="grid-container">
        <main>
          <div class="row center">
            {productList.map((val, key) => {
              return (
                <div className="card">
                  <Link to={`/product/${val._id}`}>
                    <img
                      class="medium"
                      // onClick={tracker(val._id)}
                      src={val.image}
                      alt={val.name}
                    />
                  </Link>

                  <div className="card-body">
                    <Link to={`/product/${val._id}`}>
                      <h2
                      // onClick={tracker(val._id)}
                      >
                        {val.name}
                      </h2>
                    </Link>
                    <div className="price">$ {val.price}</div>
                    <button
                      onClick={() => {
                        dispatch({
                          type: "ADD_TO_BASKET",
                          item: {
                            id: val._id,
                            image: val.image,
                            title: val.name,
                            price: val.price,
                          },
                        });
                      }}
                    >
                      Add to Basket
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
        <footer class="row center"></footer>
      </div>
    </div>
  );
}

export default Home;
