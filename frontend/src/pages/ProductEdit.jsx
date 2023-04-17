import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Typography,
  Button,
  Snackbar,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Breadcrumbs,
  Link
} from "@mui/material";
import Navbar from "../components/Navbar";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

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
      setValue("category", product.category);
      setValue("dimensions", product.dimensions);
      setValue("color", product.color);
      setValue("material", product.material);
      setValue("imageUrl", product.imageUrl);
      setValue("stock", product.stock);
      setValue("tags", product.tags.join(", "));
    }
  }, [product, setValue]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/items/${id}`,
        data
      );
      console.log(response.data);
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      {product ? (
        <form className=" mx-36 bg-white p-5" onSubmit={handleSubmit(onSubmit)}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography color="text.primary">Edit Product</Typography>
          </Breadcrumbs>
          <Box sx={{ display: "flex", gap: 2, marginTop: "1.25rem" }}>
            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                paddingRight: 1,
              }}
            >
              <Typography>Basic Details</Typography>
              <TextField
                fullWidth
                {...register("name", { required: true })}
                label="Name"
                error={!!errors.name}
                helperText={errors.name && "Name is required"}
              />
              <TextField
                fullWidth
                {...register("description", { required: true })}
                label="Description"
                error={!!errors.description}
                helperText={errors.description && "Description is required"}
                multiline='true'
                maxRows={4}
              />
              <TextField
                fullWidth
                {...register("price", { required: true })}
                label="Price"
                error={!!errors.price}
                helperText={errors.price && "Price is required"}
              />
              <TextField
                fullWidth
                {...register("stock", { required: true })}
                label="Stock"
                error={!!errors.stock}
                helperText={errors.stock && "Stock is required"}
              />
              <FormControl fullWidth>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  {...register("category", { required: true })}
                  fullWidth
                  error={!!errors.category}
                  helperText={errors.category && "Category is required"}
                >
                  <MenuItem value="">Select a category</MenuItem>
                  <MenuItem value="electronics">Electronics</MenuItem>
                  <MenuItem value="clothing">Clothing</MenuItem>
                  <MenuItem value="home">Home</MenuItem>
                  <MenuItem value="sports">Sports</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                paddingRight: 1,
              }}
            >
              <Typography>Specification</Typography>
              <TextField
                fullWidth
                {...register("dimensions", { required: true })}
                label="Dimensions"
                error={!!errors.dimensions}
                helperText={errors.dimensions && "Dimensions are required"}
              />
              <TextField
                fullWidth
                {...register("color", { required: true })}
                label="Color"
                error={!!errors.color}
                helperText={errors.color && "Color is required"}
              />
              <TextField
                fullWidth
                {...register("material", { required: true })}
                label="Material"
                error={!!errors.material}
                helperText={errors.material && "Material is required"}
              />
              <TextField
                fullWidth
                {...register("imageUrl", { required: true })}
                label="Image URL"
                error={!!errors.imageUrl}
                helperText={errors.imageUrl && "Image URL is required"}
              />
            </Box>
          </Box>
          <div className="flex gap-2 flex-col mt-2">
            <Typography>Tags</Typography>
            <TextField
              label="Tags"
              variant="outlined"
              {...register("tags", { required: false })}
              fullWidth
            />
          </div>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginTop: "1.25rem" }}
          >
            Save Changes
          </Button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message="Product updated successfully"
        autoHideDuration={3000}
      />
    </div>
  );
};
export default EditProduct;
