import { Link } from "react-router-dom";
import React from "react";
import { Menu, MenuItem, Toolbar, Typography, Tooltip, Button } from "@mui/material";
import {
  AiOutlineShoppingCart as Cart,
  AiOutlineHeart as Heart,
  AiOutlineUser as User,
} from "react-icons/ai";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="bg-white shadow-lg z-10 sticky top-0">
      <Toolbar className="flex justify-between">
        <Button disableFocusRipple component={Link} to="/">
          <img src={logo} alt="Logo" className="h-[80px]" />
        </Button>
        <div className="flex">
          <Tooltip title="Favorites">
            <Button color="inherit" component={Link} to="/cart">
              <Heart size={30} />
            </Button>
          </Tooltip>
          <Tooltip title="Cart">
            <Button color="inherit" component={Link} to="/cart">
              <Cart size={30} />
            </Button>
          </Tooltip>
          <div>
            <Tooltip title="User">
              <Button
                color="inherit"
                component={Link}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <User size={30} />
              </Button>
            </Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </Toolbar>
    </div>
  );
};

export default Navbar;
