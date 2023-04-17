import "./App.css";
import ProductPage from "./pages/Products";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import QuickNav from "./components/QuickNav";
import { AiOutlinePlus as Plus } from "react-icons/ai";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* Quick Navigation */}
      <div className="px-40 pb-5">
        <div className="flex items-center justify-between">
          <QuickNav />

          <Link to={`/items/add`}>
            <Button variant="contained" startIcon={<Plus/>}>Add</Button>
          </Link>
        </div>
        {/* Page */}
        <ProductPage />
      </div>
    </div>
  );
}

export default App;
