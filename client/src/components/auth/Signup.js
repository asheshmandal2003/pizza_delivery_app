import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
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
import ShowAlert from "../partials/ShowAlert";

const validations = yup.object({
  name: yup
    .string()
    .min(3, "Your name must contain minimum 3 characters!")
    .max(15, "Your name must contain 15 characters or less!")
    .required("Name is Required!"),
  email: yup.string().email("Invalid email!").required("Email is Required!"),
  password: yup
    .string()
    .min(8, "Your password must contain 8 characters!")
    .required("Password is Required!"),
});

function Signup({ setUser }) {
  const [visibility, setVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const [pageType, setPageType] = useState("user");

  const navigate = useNavigate();

  const signUp = async (values, onSubmitProps) => {
    const formdata = new FormData();
    for (let value in values) {
      formdata.append(value, values[value]);
    }
    formdata.append("pageType", pageType);
    await axios({
      method: "post",
      url: "http://localhost:8000/auth/signup",
      data: formdata,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setUser(res.data);
        setOpen(true);
      })
      .catch((err) => navigate("/auth/signup"));
    onSubmitProps.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
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
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {pageType === "user" && (
          <Alert
            severity="info"
            onClick={() => setPageType("admin")}
            sx={{ width: 440, mb: 3, cursor: "pointer" }}
          >
            Register as admin
          </Alert>
        )}
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
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ width: "100%" }}
          >
            <FormControl fullWidth sx={{ mb: 3 }}>
              <TextField
                id="name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                label="Name"
                error={formik.errors.name && formik.touched.name}
                helperText={formik.touched.name && formik.errors.name}
                autoFocus
              />
            </FormControl>
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
                endadornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleVisibility}>
                      {visibility ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained" sx={{ mb: 3 }}>
              Sign Up
            </Button>
          </Box>
          <Typography sx={{ mb: 3 }}>
            Already have an account?
            <Link to="/auth/signin" style={{ mb: 3, textDecoration: "none" }}>
              <Typography component="span" color="primary" ml={1}>
                Sign In
              </Typography>
            </Link>
          </Typography>
        </Card>
      </Box>
      <ShowAlert
        open={open}
        setOpen={setOpen}
        msg="An email has been sent to your email account!"
        alertType="info"
      />
    </>
  );
}

export default Signup;
