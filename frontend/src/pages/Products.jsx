import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, CardMedia, Snackbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  AiOutlineEye as ViewButton,
  AiOutlineDelete as DeletedButton,
  AiOutlineEdit as EditButton,
} from "react-icons/ai";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [deletedProduct, setDeletedProduct] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/items");
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      const productToDelete = products.find((product) => product._id === id);
      const response = await axios.delete(`http://localhost:3000/items/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      setDeletedProduct(productToDelete);
      setSnackbarOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSnackbarClose = () => {
    setDeletedProduct(null);
    setSnackbarOpen(false);
  };

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5">
        {products.map((product) => (
          <Card className="mb-5 hover:transition" key={product._id}>
            <CardMedia
              component="img"
              className="h-[200px] object-cover w-full"
              image={product.imageUrl}
            />
            <div className="p-5">
              <Typography gutterBottom component="div" fontWeight="bold">
                {product.name}
              </Typography>
              <div className="bg-gray-100 w-fit px-3 rounded-md">
                <Typography
                  gutterBottom
                  textTransform="capitalize"
                  variant="body2"
                >
                  {product.category}
                </Typography>
              </div>
              <Typography variant="body2" color="text.secondary">
                ₱{" "}
                <span className=" text-black text-base font-bold">
                  {product.price}
                </span>
              </Typography>

              <div className="flex flex-col justify-center mt-5 gap-2">
                <Link to={`/items/view/${product._id}`}>
                  <Button fullWidth variant="outlined">
                    <ViewButton />
                  </Button>
                </Link>

                <Link to={`/items/edit/${product._id}`}>
                  <Button fullWidth variant="outlined">
                    <EditButton />
                  </Button>
                </Link>
                <div onClick={() => handleDeleteProduct(product._id)}>
                  <Button fullWidth variant="outlined">
                    <DeletedButton />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={`Item '${deletedProduct?.name}' deleted.`}
      />
    </div>
  );
};

export default ProductPage;
