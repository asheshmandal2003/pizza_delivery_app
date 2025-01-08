import { Box, useMediaQuery } from "@mui/material";
import Form from "./Form";

function CreatePizza() {
  const phone = useMediaQuery("(max-width:742px)");
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "50rem",
            my: 5,
            display: phone ? "none" : "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            p: phone ? 3 : 4,
            border: "1px solid #bdbdbd",
            borderRadius: "10px",
          }}
        >
          <Box
            pl={4}
            pr={4}
            component="img"
            src="/images/pizza.svg"
            sx={{ width: "20rem" }}
          />
          <Box sx={{ width: "30rem" }}>
            <Form />
          </Box>
        </Box>
        {phone && (
          <div style={{ marginTop: 30, marginBottom: 30 }}>
            <Form />
          </div>
        )}
      </Box>
    </>
  );
}

export default CreatePizza;
