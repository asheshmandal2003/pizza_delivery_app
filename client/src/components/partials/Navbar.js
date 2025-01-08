import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../state/auth.js";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { AccountCircle, Logout } from "@mui/icons-material";
import DrawerMenu from "./DrawerMenu.js";

function ResponsiveAppBar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signout = async () => {
    dispatch(logout());
    handleClose();
  };

  const navigate = useNavigate();

  return (
    <AppBar position="sticky" sx={{ bgcolor: "error.dark" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            src="/images/pizza.svg"
            height={40}
            width={40}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
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
            <DrawerMenu user={user} />
          </Box>
          <Box
            component="img"
            src="/images/pizza.svg"
            height={40}
            width={40}
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
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
              sx={{ my: 2, color: "white", display: "block", fontWeight: 600 }}
            >
              Home
            </Button>
            <Button
              onClick={() =>
                user ? navigate("/pizza/create") : navigate("/auth")
              }
              sx={{ my: 2, color: "white", display: "block", fontWeight: 600 }}
            >
              Create Pizza
            </Button>
            {user && (
              <Button
                onClick={() => navigate("/pizza/orders")}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontWeight: 600,
                }}
              >
                {user.pageType === "user" ? "Orders" : "Track Orders"}
              </Button>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleClick} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: "#fff" }}>
                      {user.name[0].toUpperCase()}
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
                  <List disablePadding sx={{ width: 200 }}>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate("/pizza/user");
                        }}
                      >
                        <Avatar>
                          <AccountCircle />
                        </Avatar>
                        <ListItemText primary="Profile" sx={{ ml: 1 }} />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                      <ListItemButton onClick={signout}>
                        <Avatar>
                          <Logout />
                        </Avatar>
                        <Typography color="error" sx={{ ml: 1 }}>
                          Log out
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Menu>
              </>
            ) : (
              <Button
                variant="outlined"
                onClick={() => navigate("/auth")}
                sx={{ color: "white", textTransform: "none" }}
              >
                Login/Register
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
