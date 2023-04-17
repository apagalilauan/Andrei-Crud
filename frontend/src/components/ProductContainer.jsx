import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import QuickNav from "./QuickNav";
import { Card, CardMedia, Typography, Tabs, Tab, Box } from "@mui/material";

const ViewProduct = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchProductAndRelatedProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/items/${id}`);
        console.log(response.data);
        setSelectedProduct(response.data);

        // Fetch related products
        const category = response.data.category;
        setCategory(category);

        const relatedResponse = await axios.get(`http://localhost:3000/items`);
        console.log(relatedResponse.data);
        setRelatedProducts(relatedResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductAndRelatedProducts();
  }, [id]);

  const filteredProducts = relatedProducts.filter(
    (product) => product.category === category
  );

  return (
    <div>
      <Navbar />
      <div className="h-screen px-40">
        <QuickNav />
        {selectedProduct ? (
          <div className="grid grid-cols-2 gap-5">
            <Card>
              <CardMedia
                component="img"
                className="h-[350px] object-cover w-full"
                image={selectedProduct.imageUrl}
              />
            </Card>
            <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
              <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Details" />
                <Tab label="Measurements" />
                <Tab label="Review" />
              </Tabs>
              <div className="p-5">
                <Typography gutterBottom variant="h5" component="div">
                  {selectedProduct.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedProduct.description}
                </Typography>
                <div className="flex mt-2 mb-1">
                  <div className="bg-gray-100 rounded-md p-2">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textTransform="capitalize"
                    >
                      {selectedProduct.category}
                    </Typography>
                  </div>
                </div>
                <Typography variant="h6" color="text.secondary">
                  ₱{" "}
                  <span className=" text-black text-base font-bold">
                    {selectedProduct.price}
                  </span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dimensions: {selectedProduct.dimensions}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Color: {selectedProduct.color}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Material: {selectedProduct.material}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Stock: {selectedProduct.stock}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textTransform="capitalize"
                >
                  Tags: {selectedProduct.tags}
                </Typography>
              </div>
            </Box>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            Loading...
          </div>
        )}
        {filteredProducts.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-5">Related Products</h2>
            <div className="grid grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <Card key={product.id}
                sx={{marginBottom:'1.25rem'}}>
                  <CardMedia
                    component="img"
                    className="h-[150px] object-cover w-full"
                    image={product.imageUrl}
                  />
                  <div className="p-3">
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
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProduct;
