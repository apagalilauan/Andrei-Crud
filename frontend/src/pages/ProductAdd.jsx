import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Button,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { Box } from "@mui/system";
import { AiFillPlusSquare as Plus } from "react-icons/ai";
import Navbar from "../components/Navbar";

const AddProduct = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3000/items", data);
      setSnackbarOpen(true);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <Navbar />
      <form className=" mx-36 bg-white p-5" onSubmit={handleSubmit(onSubmit)}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Add Product</Typography>
        </Breadcrumbs>
        <Box sx={{ display: "flex", gap: 2, paddingTop: "1.25rem" }}>
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
              label="Name"
              variant="outlined"
              {...register("name", { required: true })}
              fullWidth
              error={!!errors.name}
              helperText={errors.name && "Name is required"}
            />
            <TextField
              label="Description"
              variant="outlined"
              {...register("description", { required: true })}
              fullWidth
              error={!!errors.description}
              helperText={errors.description && "Description is required"}
            />
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              {...register("price", { required: true, min: 0 })}
              fullWidth
              error={!!errors.price}
              helperText={errors.price && "Price is required"}
            />
            <TextField
              label="Stock"
              variant="outlined"
              type="number"
              {...register("stock", { required: true, min: 0 })}
              fullWidth
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
            <Typography>Product Specification</Typography>
            <TextField
              label="Dimensions"
              variant="outlined"
              {...register("dimensions", { required: true })}
              fullWidth
              error={!!errors.dimensions}
              helperText={errors.dimensions && "Dimension is required"}
            />
            <TextField
              label="Color"
              variant="outlined"
              {...register("color", { required: true })}
              fullWidth
              error={!!errors.color}
              helperText={errors.color && "Color is required"}
            />
            <TextField
              label="Material"
              variant="outlined"
              {...register("material", { required: true })}
              fullWidth
              error={!!errors.material}
              helperText={errors.material && "Material is required"}
            />
            <TextField
              label="Image URL"
              variant="outlined"
              {...register("imageUrl", { required: true })}
              fullWidth
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
          type="submit"
          sx={{ marginTop: "1.25rem" }}
        >
          Add
        </Button>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message="Item added."
        />
      </form>
    </div>
  );
};

export default AddProduct;
