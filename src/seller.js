import React from "react";
import "./seller.css";
import { useStateValue } from "./StateProvider";
import UploadImage from "./UploadImage";
import { Link, useHistory } from "react-router-dom";

function Checkout() {
  const [{ user }] = useStateValue();
  const history = useHistory();

  const submit = e => {
    e.preventDefault();
    history.push('/')
    }

  return (
    <div className="checkout">

        <form>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Specify your product</h2>
          <br/>
            <p>Product Name</p>
            <input type="text" name="product_name" id="product_name" /><br/><br/>
            <p>Product Description</p>
            <input type="text" name="product_desc" id="product_desc" /><br/><br/>
            <p>Price</p>
            <input type="text" name="price" id="price" /><br/><br/>
            <p>Image</p>
            <UploadImage /><br/><br/>
            <button type='submit' onClick={submit} className='list__product'>Submit</button>
        </form>
    </div>
  );
}

export default Checkout;
