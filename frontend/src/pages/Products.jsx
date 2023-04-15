import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Snackbar } from "@mui/material";
import Product from "../components/ProductContainer";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";

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
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} md={6} key={product._id}>
              <div>{product.name}</div>
              <Link to={`/items/view/${product._id}`}>
                <Button>
                  <AiOutlineEye /> Open
                </Button>
              </Link>
              <Link to={`/items/edit/${product._id}`}>
                <Button>
                  <AiOutlineEye /> Edit
                </Button>
              </Link>
              <Button onClick={() => handleDeleteProduct(product._id)}>
                <AiOutlineEye /> Delete
              </Button>
            </Grid>
          ))}
        </Grid>

        <Link to={`/items/add`}>
          <Button fullWidth type="submit">Add</Button>
        </Link>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={`Item '${deletedProduct?.name}' deleted.`}
      />
    </Box>
  );
};

export default ProductPage;
