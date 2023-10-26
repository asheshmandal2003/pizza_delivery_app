import { Box } from "@mui/material";
import Pizzas from "./Pizzas";
import ResponsiveAppBar from "../partials/Navbar.js";

export default function Homepage() {
  return (
    <>
      <Box height="auto">
        <ResponsiveAppBar />
        <Pizzas />
      </Box>
    </>
  );
}
