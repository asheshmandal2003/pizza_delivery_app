import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import { useState } from "react";
import { deepOrange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../state/auth.js";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signout = () => {
    dispatch(logout());
    handleClose();
  };

  const navigate = useNavigate();

  return (
    <AppBar position="sticky" color="error">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalPizzaIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            onClick={() => navigate("/pizza")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            PIZZA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={() => navigate("/pizza")}>Home</MenuItem>
              <MenuItem onClick={() => navigate("/pizza/create")}>
                Create Pizza
              </MenuItem>
              <MenuItem onClick={() => navigate("/pizza/orders")}>
                {user.pageType === "user" ? "Orders" : "Track Orders"}
              </MenuItem>
            </Menu>
          </Box>
          <LocalPizzaIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            onClick={() => navigate("/pizza")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PIZZA
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => navigate("/pizza")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
            <Button
              onClick={() => navigate("/pizza/create")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Create Pizza
            </Button>
            <Button
              onClick={() => navigate("/pizza/orders")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {user.pageType === "user" ? "Orders" : "Track Orders"}
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleClick} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
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
                  {user.pageType === "user" && (
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                  )}
                  {user.pageType === "admin" && (
                    <MenuItem
                      onClick={() => {
                        navigate("/pizza/dashboard");
                        handleClose();
                      }}
                    >
                      Dashboard
                    </MenuItem>
                  )}
                  <MenuItem onClick={signout}>Log Out</MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: "flex" }}>
                <MenuItem onClick={() => navigate("/auth/signin")}>
                  Sign In
                </MenuItem>
                <MenuItem onClick={() => navigate("/auth/signup")}>
                  Sign Up
                </MenuItem>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
