import React, { useEffect, useState } from "react";
import "./DataCollect.css";
import uploadImg from "../../assets/photo.png";
import { Button, TextField } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  firebaseDatabase,
  firebaseStorage,
} from "../../Backend/FireBaseHandler";
import { v4 as uuidv4 } from "uuid";
import { push, ref as fireDatabaseRef } from "firebase/database";
import { useNavigate } from "react-router-dom";

const DataCollect = () => {
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({
    productImage: "",
    productName: "",
    productPrize: "",
    productMRP: "",
  });
 
  // side effect to change MRP value
  useEffect(() => {
    if (!productInfo.productPrize) {
      setProductInfo({
        ...productInfo,
        productMRP: 0,
      });
    } else {
      const MRP =
        parseFloat(productInfo.productPrize * 0.18) +
        parseFloat(productInfo.productPrize);
      setProductInfo({
        ...productInfo,
        productMRP: MRP,
      });
    }
  }, [productInfo.productPrize]);

  // get input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo({
      ...productInfo,
      [name]: value,
    });
  };

  // Upload Image to Firebase Storage
  const handleImage = () => {
    const inputEle = document.createElement("input");
    inputEle.setAttribute("type", "file");
    inputEle.onchange = async (event) => {
      const file = event.target.files[0];
      const key = uuidv4();
      const fsref = ref(firebaseStorage, `ProductImages/${key}`);
      await uploadBytes(fsref, file);
      const imgurl = await getDownloadURL(fsref);
      setProductInfo({
        ...productInfo,
        productImage: imgurl,
      });
      alert("Image uploaded!");
    };
    inputEle.click();
  };

  // Validate And Upload data to Firebase Database
  const handleClick = () => {
    if (productInfo.productImage == "") {
      alert("Upload an Image");
    } else if (productInfo.productName == "") {
      alert("Enter Product Name");
    } else if (productInfo.productPrize == "") {
      alert("Enter Product Prize");
    } else {
      const sendData = async () => {
        const fbref = fireDatabaseRef(firebaseDatabase, "Product-Records");
        await push(fbref, productInfo);
        alert("Product Added!");
        navigate("/product-details");
      };
      sendData();
    }
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <img
          src={productInfo.productImage ? productInfo.productImage : uploadImg}
          alt="Image"
          onClick={handleImage}
        />
        <TextField
          sx={{ width: "600px", marginBottom: "10px" }}
          id="outlined-basic"
          label="Product Name"
          variant="outlined"
          name="productName"
          onChange={handleChange}
          value={productInfo.productName}
        />
        <TextField
          sx={{ width: "600px", marginBottom: "10px" }}
          id="outlined-basic"
          label="Product Prize"
          variant="outlined"
          type={"number"}
          name="productPrize"
          onChange={handleChange}
          value={productInfo.productPrize}
        />
        <TextField
          sx={{ width: "600px", marginBottom: "10px" }}
          id="outlined-basic"
          label="MRP"
          variant="outlined"
          name="productMRP"
          onChange={handleChange}
          value={productInfo.productMRP}
          disabled
        />
        <Button
          sx={{ width: "300px" }}
          variant="contained"
          onClick={handleClick}
        >
          Save Product
        </Button>
        <Button
          sx={{ width: "300px", marginTop: "10px" }}
          variant="outlined"
          onClick={() => navigate("/product-details")}
        >
          View Products
        </Button>
      </div>
    </div>
  );
};

export default DataCollect;
