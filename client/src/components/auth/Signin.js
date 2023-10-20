import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import ShowAlert from "../partials/ShowAlert";
import { useDispatch } from "react-redux";
import { login } from "../../state/auth.js";
import { useMediaQuery } from "@mui/material";

const validations = yup.object({
  email: yup.string().email("Invalid email!").required("Email is Required!"),
  password: yup
    .string()
    .min(8, "Your password must contain 8 characters!")
    .required("Password is Required!"),
});

function Signin() {
  const [visibility, setVisibility] = useState(false);
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tab = useMediaQuery("(max-width:1000px)");
  const phone = useMediaQuery("(max-width:600px)");

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
      .then((res) => {
        setMsg("You are successfully logged in!");
        setOpen(true);
        setAlertType("success");
        dispatch(login({ user: res.data.user, token: res.data.token }));
        navigate("/pizza");
      })
      .catch((err) => {
        setMsg("Invalid Username and Password!");
        setOpen(true);
        setAlertType("error");
        navigate("/auth/signin");
      });
    onSubmitProps.resetForm();
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
    <>
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
            width: tab ? (phone ? 280 : 350) : 400,
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
              <InputLabel>Email</InputLabel>
              <OutlinedInput
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                label="Email"
                error={
                  Boolean(formik.errors.email) && Boolean(formik.touched.email)
                }
              />
              <Typography color="error" mt={1} variant="caption">
                {Boolean(formik.touched.email) && formik.errors.email}
              </Typography>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                label="Password"
                error={
                  Boolean(formik.errors.password) &&
                  Boolean(formik.touched.password)
                }
                type={visibility ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleVisibility}>
                      {visibility ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <Typography color="error" mt={1} variant="caption">
                {Boolean(formik.touched.password) && formik.errors.password}
              </Typography>
            </FormControl>
            <Box
              mb={3}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Typography sx={{ cursor: "pointer" }}>
                <Link
                  to="/forgot-password"
                  style={{ textDecoration: "none", color: "crimson" }}
                >
                  Forgot Password?
                </Link>
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
                Sign Up
              </Typography>
            </Link>
          </Typography>
        </Card>
      </Box>
      <ShowAlert
        open={open}
        setOpen={setOpen}
        msg={msg}
        alertType={alertType}
      />
    </>
  );
}

export default Signin;
