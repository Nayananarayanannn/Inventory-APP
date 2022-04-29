import { Button, Grid, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AvatarIcon from "./AvatarIcon";

function Header() {
  const navigate = useNavigate();

  // avatar dropdown
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // logout
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate('/');
  }

  return (
    <div>
      <Grid
        container
        className="logoHead"
        sx={{
          backgroundColor:"rgba(0,200,300,0.1)"
        }}
      > 
      {/* company logo and Name */}
      
          <h1 style={{ fontFamily: 'whisper, cursive' , color:"rgb(17, 136, 196)",paddingLeft:"" }}>ProManage</h1>

        {/* avatar Image and dropdown */}
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <AvatarIcon />
        </Button>
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
          <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        </Menu>
      </Grid>
    </div>
  );
}

export default Header;
