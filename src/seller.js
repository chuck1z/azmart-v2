import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import "./Seller.css";

function Seller() {
  const [{ basket, user }, dispatch] = useStateValue();

  const [productList, setProductList] = useState([]);

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  const addProduct = () => {
    Axios.post("http://localhost:3001/api/add", {
      productName: productName,
      category: category,
      image: image,
      seller: user,
      price: price,
      brand: brand,
      description: description,
    }).then((response) => {
      Axios.post("http://localhost:3001/api/getseller", { user: user })
        // Axios.get("http://localhost:3001/api/get")
        .then((data) => {
          console.log(data);
          setProductList(data.data);
        });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getseller", { user: user })
      // Axios.get("http://localhost:3001/api/get")
      .then((data) => {
        console.log(data);
        setProductList(data.data);
      });
  }, []);

  return (
    <div>
      <div className="productform">
        <div className="column">
          <label>Product Name</label>
          <input
            type="text"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
        </div>
        <div className="column">
          <label>Category</label>
          <input
            type="text"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
        </div>
        <div className="column">
          <label>Image</label>
          <input
            type="text"
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
        </div>
        <div className="column">
          <label>Price</label>
          <input
            type="text"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div className="column">
          <label>Brand</label>
          <input
            type="text"
            onChange={(e) => {
              setBrand(e.target.value);
            }}
          />
        </div>
        <div className="column">
          <label>Description</label>
          <input
            type="textarea"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="column">
          <button onClick={addProduct}>Add Product</button>
        </div>
      </div>
      <div class="row center">
        {productList.map((val, key) => {
          return (
            <div className="card">
              <Link to={`/product/${val._id}`}>
                <img class="medium" src={val.image} alt={val.name} />
              </Link>

              <div className="card-body">
                <Link to={`/product/${val._id}`}>
                  <h2>{val.name}</h2>
                </Link>
                <div className="price">$ {val.price}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Seller;
