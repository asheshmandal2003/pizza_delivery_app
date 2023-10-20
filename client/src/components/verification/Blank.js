import { Box, Button, Card, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

function Blank() {
  const params = useParams();
  const resendEmail = async () => {
    try {
      await axios({
        method: "POST",
        url: `${process.env.REACT_APP_BASE_URL}/auth/resend/${params.id}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      width="100%"
      sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 5 }}
    >
      <Card
        sx={{
          width: 500,
          p: 4,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" mb={4}>
          An email has been sent to your email!
        </Typography>
        <Button onClick={resendEmail} variant="contained">
          Resend Email
        </Button>
      </Card>
    </Box>
  );
}

export default Blank;
