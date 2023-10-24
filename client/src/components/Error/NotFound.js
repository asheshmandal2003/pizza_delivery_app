import { Box, Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box width="100%" mb={3}>
          <Typography variant="h4" color="error" component="span" mr={1}>
            404
          </Typography>
          <Typography variant="h5" component="span">
            Page Not Found
          </Typography>
        </Box>
        <Button variant="contained" onClick={() => navigate("/pizza")}>
          Back to Homepage
        </Button>
      </Card>
    </Box>
  );
}

export default NotFound;
