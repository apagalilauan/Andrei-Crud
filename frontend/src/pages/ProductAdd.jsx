import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button, Snackbar, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

const AddProduct = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        color: "white",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Add Product
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Name"
          variant="outlined"
          {...register("name", { required: true })}
        />
        <TextField
          label="Description"
          variant="outlined"
          {...register("description", { required: true })}
        />
        <TextField
          label="Price"
          variant="outlined"
          type="number"
          {...register("price", { required: true, min: 0 })}
        />
        <TextField
          label="Category"
          variant="outlined"
          {...register("category", { required: true })}
        />
        <TextField
          label="Dimensions"
          variant="outlined"
          {...register("dimensions", { required: true })}
        />
        <TextField
          label="Color"
          variant="outlined"
          {...register("color", { required: true })}
        />
        <TextField
          label="Material"
          variant="outlined"
          {...register("material", { required: true })}
        />
        <TextField
          label="Image URL"
          variant="outlined"
          {...register("imageUrl", { required: true })}
        />
        <TextField
          label="Stock"
          variant="outlined"
          type="number"
          {...register("stock", { required: true, min: 0 })}
        />
        <TextField
          label="Tags"
          variant="outlined"
          {...register("tags", { required: true })}
        />
        <Button variant="contained" type="submit">
          Add
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Item added."
      />
    </Box>
  );
};

export default AddProduct;
