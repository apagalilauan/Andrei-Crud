import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const ViewRecipe = () => {
  const { id } = useParams(); // Destructure the id value from the object
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const viewProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/items/${id}`);
        console.log(response.data);
        setSelectedProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    viewProduct();
  }, [id]);

  return (
    <div className="bg-[#040410] text-white h-screen">
      {selectedProduct ? (
        <div>
          <div>{selectedProduct.name}</div>
          <div>{selectedProduct.description}</div>
          <div>{selectedProduct.price}</div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
            Loading...
        </div>
      )}
    </div>
  );
};

export default ViewRecipe;
