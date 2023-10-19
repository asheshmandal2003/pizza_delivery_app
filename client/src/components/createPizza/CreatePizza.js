import { Box, Card, useMediaQuery } from "@mui/material";
import Form from "./Form";
import ResponsiveAppBar from "../partials/Navbar.js";

function CreatePizza() {
  const tab = useMediaQuery("(max-width:1200px)");
  const phone = useMediaQuery("(max-width:600px)");
  return (
    <>
      <ResponsiveAppBar />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mt: 5,
          mb: 7,
        }}
      >
        <Box
          sx={{
            width: "50rem",
            display: phone || tab ? "none" : "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
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
        <Card
          sx={{
            display: !tab ? "none" : false,
            width: phone ? 350 : 450,
          }}
        >
          <Form />
        </Card>
      </Box>
    </>
  );
}

export default CreatePizza;
