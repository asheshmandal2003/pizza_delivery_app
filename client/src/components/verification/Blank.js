import {
  Alert,
  Box,
  Button,
  Card,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

function Blank() {
  const params = useParams();
  const isMobile = useMediaQuery("(max-width:742px)");

  const resendEmail = async () => {
    try {
      await axios({
        method: "POST",
        url: `${process.env.REACT_APP_BASE_URL}/auth/resend/${params.id}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Verification email has been resent!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: isMobile ? 280 : 500,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "#4a5568",
          }}
        >
          Verify Your Email
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "#6b7280",
          }}
        >
          A verification link has been sent to your email. Please check your
          inbox to complete your registration.
        </Typography>
        <Alert severity="info" sx={{ width: "100%" }}>
          The link will expire in 1 hour!
        </Alert>
        <Button
          onClick={resendEmail}
          variant="contained"
          startIcon={<RefreshRoundedIcon />}
          size={isMobile ? "small" : "medium"}
          sx={{
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "#fff",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            "&:hover": {
              background: "linear-gradient(135deg, #5a67d8, #6b46c1)",
            },
          }}
        >
          Resend Email
        </Button>
      </Card>
    </Box>
  );
}

export default Blank;
