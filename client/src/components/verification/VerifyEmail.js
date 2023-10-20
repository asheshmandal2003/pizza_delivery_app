import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Button, Card, Typography } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

function VerifyEmail() {
  const [verified, setVerified] = useState(false);
  const params = useParams();
  useEffect(() => {
    const verifyEmailUrl = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/auth/users/${params.id}/verify/${params.token}`
        )
        .then(() => {
          setVerified(true);
        })
        .catch((err) => {
          setVerified(false);
        });
    };
    verifyEmailUrl();
  }, [params, verified]);

  return (
    <>
      {verified ? (
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
              width: "25rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: "20px",
            }}
          >
            <Box>
              <VerifiedUserIcon color="primary" sx={{ fontSize: 100, mb: 3 }} />
            </Box>
            <Typography mb={1} variant="h4">
              Verified!
            </Typography>
            <Typography mb={3} color="#9e9e9e">
              Yahoo! You have successfully verified the account 🎉
            </Typography>

            <Link to="/auth/signin" style={{ textDecoration: "none" }}>
              <Button variant="contained"> Sign In</Button>
            </Link>
          </Card>
        </Box>
      ) : (
        <h1>404 not found!</h1>
      )}
    </>
  );
}

export default VerifyEmail;
