import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
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
  location: yup
    .string()
    .max(50, "Your location must contain 50 characters or less!")
    .required("Location is Required!"),
  email: yup.string().email("Invalid email!").required("Email is Required!"),
  password: yup
    .string()
    .min(8, "Your password must contain 8 characters!")
    .required("Password is Required!"),
});

function Signup() {
  const [disable, setDisable] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const [pageType, setPageType] = useState("user");
  const navigate = useNavigate();
  const phone = useMediaQuery("(max-width:600px)");

  const signUp = async (values, onSubmitProps) => {
    setDisable(true);
    const formdata = new FormData();
    for (let value in values) {
      formdata.append(value, values[value]);
    }
    formdata.append("pageType", pageType);
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/auth/signup`,
      data: formdata,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setDisable(false);
        navigate(`/${res.data._id}`);
      })
      .catch((err) => {
        setDisable(false);
        setOpen(true);
      });
    onSubmitProps.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
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
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* {pageType === "user" && (
          <Alert
            severity="info"
            onClick={() => setPageType("admin")}
            sx={{
              width: tab ? (phone ? 280 : 350) : 400,
              mb: 3,
              cursor: "pointer",
            }}
          >
            Register as admin
          </Alert>
        )} */}
        <Card
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            width: phone ? "80%" : 400,
            p: phone ? 2 : 4,
            my: 5,
          }}
        >
          <Stack
            spacing={3}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5" color="primary" sx={{ mb: 3 }}>
              {pageType === "user" ? "Sign Up" : "Admin Register"}
            </Typography>
            <TextField
              autoFocus
              fullWidth
              id="name"
              name="name"
              placeholder="Enter your full name"
              onChange={formik.handleChange}
              value={formik.values.name}
              label="Name"
              onBlur={formik.handleBlur}
              error={
                Boolean(formik.errors.name) && Boolean(formik.touched.name)
              }
              helperText={Boolean(formik.touched.name) && formik.errors.name}
            />
            <TextField
              fullWidth
              id="location"
              name="location"
              placeholder="Enter your location"
              onChange={formik.handleChange}
              value={formik.values.location}
              label="Location"
              onBlur={formik.handleBlur}
              error={
                Boolean(formik.errors.location) &&
                Boolean(formik.touched.location)
              }
              helperText={
                Boolean(formik.touched.location) && formik.errors.location
              }
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              placeholder="john@example.com"
              onChange={formik.handleChange}
              value={formik.values.email}
              label="Email"
              onBlur={formik.handleBlur}
              error={
                Boolean(formik.errors.email) && Boolean(formik.touched.email)
              }
              helperText={Boolean(formik.touched.email) && formik.errors.email}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              label="Password"
              placeholder="Enter minimum 8 digit password"
              error={
                Boolean(formik.errors.password) &&
                Boolean(formik.touched.password)
              }
              helperText={
                Boolean(formik.touched.password) && formik.errors.password
              }
              type={visibility ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleVisibility}>
                      {visibility ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              disabled={disable}
              fullWidth
              variant="contained"
              sx={{ mb: 3 }}
            >
              {disable ? "Registering..." : "Sign up"}
            </Button>
            <Typography sx={{ mb: 3 }}>
              Already have an account?{" "}
              <Link to="/auth/signin" style={{ mb: 3, textDecoration: "none" }}>
                <Typography
                  component="span"
                  color="primary"
                  sx={{ textDecoration: "underline" }}
                >
                  Sign In
                </Typography>
              </Link>
            </Typography>
          </Stack>
        </Card>
      </Box>
      <ShowAlert
        open={open}
        setOpen={setOpen}
        msg="Something went wrong!"
        alertType="error"
      />
      ;
    </>
  );
}

export default Signup;
