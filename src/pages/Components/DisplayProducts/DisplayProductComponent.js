import { Button } from "@mui/material";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseDatabase } from "../../../Backend/FireBaseHandler";
import "./DisplayProduct.css";

const DisplayProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // side effect to fetch the data from firebase database
  useEffect(() => {
    const dataref = ref(firebaseDatabase, "Product-Records");
    onValue(dataref, (snapshot) => {
      setProducts(Object.values(snapshot.val()));
    });
  }, []);
  
  return (
    <div>
      <header>
        <h1>Product List</h1>
        <Button variant="contained" onClick={() => navigate("/")}>
          Add Product
        </Button>
      </header>
      <div className="product-main-container">
        {products == "" ? (
          <h1>No Product to show Add Product</h1>
        ) : (
          products.map((product) => {
            return (
              <div className="product-list">
                <img src={product.productImage} />
                <div className="product-details">
                  <h2>Name : {product.productName}</h2>
                  <h2>Prize : {product.productPrize}</h2>
                  <h3>MRP : {product.productMRP}</h3>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DisplayProduct;
