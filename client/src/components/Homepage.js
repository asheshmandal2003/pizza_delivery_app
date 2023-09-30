import { Box } from "@mui/material";
import Pizzas from "./Pizzas";
import ResponsiveAppBar from "./partials/Navbar.js";

export default function Homepage({ user, setUser }) {
  return (
    <>
      <Box height="auto">
        <ResponsiveAppBar user={user} setUser={setUser} />
        <Pizzas user={user} />
      </Box>
    </>
  );
}
