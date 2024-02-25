import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
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
  const [disable, setDisable] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const phone = useMediaQuery("(max-width:600px)");

  const signUp = async (values) => {
    setDisable(true);
    const formdata = new FormData();
    for (let value in values) {
      formdata.append(value, values[value]);
    }
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/auth/signin`,
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
      });
    setDisable(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => signUp(values),
    validationSchema: validations,
  });

  const handleVisibility = () => {
    setVisibility(!visibility);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            mt: 5,
            width: phone ? "76%" : 400,
            p: phone ? 3 : 4,
            pb: 8,
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
            <Typography variant={phone ? "h6" : "h5"} color="primary">
              Sign In
            </Typography>
            <TextField
              autoFocus
              fullWidth
              name="email"
              id="email"
              label="Email"
              placeholder="john@example.com"
              type="email"
              size={phone ? "small" : "medium"}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                Boolean(formik.touched.email) && Boolean(formik.errors.email)
              }
              helperText={Boolean(formik.touched.email) && formik.errors.email}
            />

            <TextField
              fullWidth
              name="password"
              id="password"
              label="Password"
              size={phone ? "small" : "medium"}
              type={visibility ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                Boolean(formik.touched.password) &&
                Boolean(formik.errors.password)
              }
              helperText={
                Boolean(formik.touched.password) && formik.errors.password
              }
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
            <Box
              mb={3}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Typography
                variant="body2"
                color="error"
                component={"div"}
                onClick={() => navigate("/forgot-password")}
                sx={{ cursor: "pointer" }}
              >
                Forgot Password
              </Typography>
            </Box>
            <Button
              type="submit"
              disabled={disable}
              fullWidth
              size={phone ? "small" : "medium"}
              variant="contained"
              sx={{ mb: 3 }}
            >
              {disable ? "Signing In..." : "Sign In"}
            </Button>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Typography
                component="span"
                color="primary"
                sx={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => navigate("/auth/signup")}
              >
                Sign up
              </Typography>
            </Typography>
          </Stack>
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
