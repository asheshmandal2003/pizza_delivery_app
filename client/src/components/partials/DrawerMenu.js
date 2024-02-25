import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import {
  Dashboard,
  DeliveryDining,
  Home,
  LocalPizza,
  Menu,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function DrawerMenu({ user }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/pizza")}>
            <Avatar>
              <Home />
            </Avatar>
            <ListItemText primary="Home" sx={{ ml: 1 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/pizza/create")}>
            <Avatar>
              <LocalPizza />
            </Avatar>
            <ListItemText primary="Create Pizza" sx={{ ml: 1 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/pizza/orders")}>
            <Avatar>
              <DeliveryDining />
            </Avatar>
            <ListItemText
              primary={user.pageType === "admin" ? "Orders" : "Track Orders"}
              sx={{ ml: 1 }}
            />
          </ListItemButton>
        </ListItem>
        {user.pageType === "admin" && (
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/pizza/dashboard")}>
              <Avatar>
                <Dashboard />
              </Avatar>
              <ListItemText primary="Dashboard" sx={{ ml: 1 }} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={toggleDrawer(true)}
        color="inherit"
      >
        <Menu />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
