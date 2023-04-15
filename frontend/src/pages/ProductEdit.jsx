import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button, Snackbar } from "@mui/material";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/items/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("price", product.price);
    }
  }, [product, setValue]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(`http://localhost:3000/items/${id}`, data);
      console.log(response.data);
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[#040410] text-white h-screen">
      {product ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Name</label>
            <input {...register("name")} />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input {...register("description")} />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input {...register("price")} />
          </div>
          <Button type="submit">Save</Button>
        </form>
      ) : (
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={`Item '${product?.name}' saved.`}
      />
    </div>
  );
};

export default EditProduct;
