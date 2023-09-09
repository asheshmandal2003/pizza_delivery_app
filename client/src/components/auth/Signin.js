import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const validations = yup.object({
  email: yup.string().email("Invalid email!").required("Email is Required!"),
  password: yup
    .string()
    .min(8, "Your password must contain 8 characters!")
    .required("Password is Required!"),
});

function Signin({ setUser }) {
  const [visibility, setVisibility] = useState(false);

  const navigate = useNavigate();

  const signUp = async (values, onSubmitProps) => {
    const formdata = new FormData();
    for (let value in values) {
      formdata.append(value, values[value]);
    }
    await axios({
      method: "post",
      url: "http://localhost:8000/auth/signin",
      data: formdata,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
    onSubmitProps.resetForm();
    navigate("/pizza");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, onSubmitProps) => signUp(values, onSubmitProps),
    validationSchema: validations,
  });

  const handleVisibility = () => {
    setVisibility(!visibility);
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
          width: "400px",
          p: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" color="primary" sx={{ mb: 3 }}>
          Sign In
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ width: "100%" }}
        >
          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              label="Email"
              error={formik.errors.email && formik.touched.email}
              helperText={formik.touched.email && formik.errors.email}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              label="Password"
              error={formik.errors.password && formik.touched.password}
              helperText={formik.touched.password && formik.errors.password}
              type={visibility ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleVisibility}>
                    {visibility ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Box
            mb={3}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Typography color="error" sx={{ cursor: "pointer" }}>
              Forgot Password?
            </Typography>
          </Box>
          <Button type="submit" fullWidth variant="contained" sx={{ mb: 3 }}>
            Sign In
          </Button>
        </Box>
        <Typography sx={{ mb: 3 }}>
          Don't have an account?
          <Link to="/auth/signup" style={{ mb: 3, textDecoration: "none" }}>
            <Typography component="span" color="primary" ml={1}>
              Sign In
            </Typography>
          </Link>
        </Typography>
      </Card>
    </Box>
  );
}

export default Signin;
