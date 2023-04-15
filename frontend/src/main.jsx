import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import App from "./App";
import Product from "./components/ProductContainer";
import EditProduct from "./pages/ProductEdit";
import AddProduct from "./pages/ProductAdd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/items/view/:id",
    element: <Product />,
  },
  {
    path: "/items/edit/:id",
    element: <EditProduct />,
  },
  {
    path: "/items/add/",
    element: <AddProduct />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
