import React from "react";
import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { admin, currentUser } = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div id="custom-menu">
      <MenuIcon
        id="hamburger-icon"
        fontSize="large"
        color="disabled"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      ></MenuIcon>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {!admin && !currentUser && (
          <div>
            <MenuItem onClick={handleClose}>
              <Link to="/login">Login</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/signup">Register</Link>
            </MenuItem>
          </div>
        )}
        {(admin || currentUser) && (
          <MenuItem onClick={handleClose}>
            <Link to="logout">Logout</Link>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
