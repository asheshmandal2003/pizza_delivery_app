import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button, Card, Typography, CircularProgress } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LinkNotFound from "../Error/LinkNotFound";
import { useNotification } from "../../context/NotificationProvider";

const VerifyEmail = () => {
  const [status, setStatus] = useState("loading");
  const { id, token } = useParams();
  const hasRequested = useRef(false);
  const notify = useNotification();

  useEffect(() => {
    if (hasRequested.current) return;
    hasRequested.current = true;

    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/auth/users/${id}/verify/${token}`
        );
        if (response.status === 200) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        notify(error.response.data.message, "error");
        setStatus("error");
      }
    };

    verifyEmail();
  }, [id, token]);

  if (status === "loading") {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Verifying your account...
        </Typography>
      </Box>
    );
  }

  if (status === "success") {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ textAlign: "center", p: 3 }}>
          <VerifiedUserIcon sx={{ color: "green", fontSize: 80, mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Email Verified!
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Your email has been successfully verified. You can now log in.
          </Typography>
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Card>
      </Box>
    );
  }

  return <LinkNotFound />;
};

export default VerifyEmail;
