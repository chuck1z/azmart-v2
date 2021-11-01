import React, { useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import "./ProductScreen.css";
import Axios from "axios";
import { useParams } from "react-router-dom";

function ProductScreen() {
  const [{ user }, dispatch] = useStateValue();
  const id = useParams().id;

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    console.log(id);
    Axios.post("http://localhost:3001/api/getid", {
      _id: id,
    }).then((data) => {
      console.log(data);
      setProductList(data.data);
      console.log(productList);
    });
    Axios.post("http://localhost:3001/api/tracker", {
      id: id,
    }).then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <div>
      {productList.map((val, key) => {
        return (
          <div className="row">
            <div className="col-2">
              <img className="large" src={val.image} alt={val.name} />
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{val.name}</h1>
                </li>
                <li>Price: ${val.price}</li>
                <li>Description: {val.description}</li>
              </ul>
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
  );
}

export default ProductScreen;
