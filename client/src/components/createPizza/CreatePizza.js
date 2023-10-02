import { Box } from "@mui/material";
import Form from "./Form";
import ResponsiveAppBar from "../partials/Navbar.js";

function CreatePizza() {
  return (
    <>
      <ResponsiveAppBar />
      <Box
        sx={{
          height: "120vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "50rem",
            height: "40rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            pl: 4,
            pr: 4,
            border: "1px solid #bdbdbd",
            borderRadius: "10px",
          }}
        >
          <Box
            pl={4}
            pr={4}
            component="img"
            src="https://img.freepik.com/free-vector/pizza-maker-concept-illustration_114360-3238.jpg?w=740&t=st=1694522774~exp=1694523374~hmac=0b1d48ca76a65e01560813330b9bd3d5449b7937866640a19859070cd0fec930"
            sx={{ width: "20rem" }}
          />
          <Box sx={{ width: "30rem" }}>
            <Form />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CreatePizza;
