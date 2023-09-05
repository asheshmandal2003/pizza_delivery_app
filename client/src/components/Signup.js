import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ShowAlert from "./partials/ShowAlert";

function Signup({ setUser }) {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const [signinPage, setSigninPage] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => {
      return { ...prevValues, [name]: value };
    });
  };

  const handleSubmission = async (event) => {
    event.preventDefault();
    try {
      const formdata = new FormData();
      for (let value in values) {
        formdata.append(value, values[value]);
      }
      await axios({
        method: "post",
        url: `http://localhost:8000/auth/${signinPage ? "signin" : "signup"}`,
        data: formdata,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          setUser(response.data);
          setValues({ name: "", email: "", password: "" });
          navigate("/pizza");
        })
        .catch((error) => {
          navigate("/auth");
          setError(error.message);
        });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Box
        height="100vh"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmission}
          autoComplete="off"
          p={4}
          sx={{
            width: "35%",
            boxShadow: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ marginBottom: "20px" }} variant="h5">
            {signinPage ? "Sign In" : "Sign Up"}
          </Typography>
          {!signinPage && (
            <FormControl fullWidth sx={{ marginBottom: "20px" }}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <OutlinedInput
                id="name"
                label="Name"
                name="name"
                autoFocus
                value={values.name}
                onChange={handleChange}
              />
            </FormControl>
          )}
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              label="Password"
              name="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {signinPage && (
            <Typography
              mb={3}
              color="error"
              sx={{ width: "100%", textAlign: "end" }}
            >
              Forgot Password?
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={() => setOpen(true)}
          >
            {signinPage ? "Sign In" : "Sign Up"}
          </Button>
          <Box mt={5}>
            <Typography display="flex">
              {signinPage
                ? "Don't have an account?"
                : "Already have an account?"}
              {signinPage ? (
                <Typography
                  component="button"
                  color="primary"
                  sx={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setValues({ name: "", email: "", password: "" });
                    setSigninPage(false);
                  }}
                >
                  Sign Up
                </Typography>
              ) : (
                <Typography
                  component="button"
                  color="primary"
                  sx={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setValues({ name: "", email: "", password: "" });
                    setSigninPage(true);
                  }}
                >
                  Sign In
                </Typography>
              )}
            </Typography>
          </Box>
        </Box>
      </Box>
      <ShowAlert
        open={open}
        setOpen={setOpen}
        msg={error}
        alertType={"error"}
      />
    </>
  );
}

export default Signup;
