import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Button,
  Card,
  CardMedia,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import LoadingBtn from "../components/LoadingBtn.js";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";

const registerValidationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name must have at least 3 characters!")
    .max(15, "Name must be 15 characters or less!")
    .required("Name is required!"),
  location: yup
    .string()
    .max(50, "Location must be 50 characters or less!")
    .required("Location is required!"),
  email: yup.string().email("Invalid email!").required("Email is required!"),
  password: yup
    .string()
    .min(8, "Password must have at least 8 characters!")
    .required("Password is required!"),
});

const loginValidationSchema = yup.object({
  email: yup.string().email("Invalid email!").required("Email is Required!"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character!"
    )
    .required("Password is required!"),
});

const registerInitialValues = {
  name: "",
  location: "",
  email: "",
  password: "",
};

const loginInitialValues = {
  email: "",
  password: "",
};

export const AuthForm = ({ isLogin, setIsLogin, handleSubmit, loading }) => {
  const [visibility, setVisibility] = useState(() => false);
  const navigate = useNavigate();
  const isPhone = useMediaQuery("(max-width:742px)");
  const toggleVisibility = () => setVisibility((prev) => !prev);

  const validationSchema = isLogin
    ? loginValidationSchema
    : registerValidationSchema;
  const initialValues = isLogin ? loginInitialValues : registerInitialValues;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const inputProps = {
    size: isPhone ? "small" : "medium",
    fullWidth: true,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  };

  function changePage(path) {
    navigate(path);
    setIsLogin((prev) => !prev);
  }

  return (
    <Card
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        width: isPhone ? 300 : 380,
        justifySelf: "center",
        my: isPhone ? 4 : 8,
      }}
    >
      <CardMedia
        component="img"
        height={150}
        image="/images/pizza.jpg"
        alt="Pizza"
      />
      <Stack
        spacing={isPhone ? 3 : 4}
        sx={{
          p: isPhone ? 3 : 4,
        }}
      >
        {isLogin && (
          <Alert severity="info">
            For testing purposes, use the following credentials:{" "}
            <strong>Email:</strong> user@gmail.com, <strong>Password:</strong>{" "}
            User@123. To test the "Forgot Password" feature, please sign up
            using a valid email address.
          </Alert>
        )}

        <Typography
          variant={isPhone ? "h6" : "h5"}
          component="h1"
          fontWeight={620}
          color="error"
        >
          {isLogin ? "Sign In" : "Sign Up"}
        </Typography>
        {!isLogin && (
          <>
            <TextField
              {...inputProps}
              id="name"
              name="name"
              label="Name"
              placeholder="John Doe"
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonRoundedIcon
                      fontSize={isPhone ? "small" : "medium"}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              {...inputProps}
              id="location"
              name="location"
              label="Location"
              placeholder="Enter your full address"
              value={formik.values.location}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PlaceRoundedIcon fontSize={isPhone ? "small" : "medium"} />
                  </InputAdornment>
                ),
              }}
            />
          </>
        )}
        <TextField
          {...inputProps}
          label="Email"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={formik.values.email}
          error={Boolean(formik.touched.email && formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailRoundedIcon fontSize={isPhone ? "small" : "medium"} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          {...inputProps}
          label="Password"
          name="password"
          type={visibility ? "text" : "password"}
          placeholder="Enter your password"
          value={formik.values.password}
          error={Boolean(formik.touched.password && formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyRoundedIcon fontSize={isPhone ? "small" : "medium"} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleVisibility}>
                  {visibility ? (
                    <VisibilityOff fontSize={isPhone ? "small" : "medium"} />
                  ) : (
                    <Visibility fontSize={isPhone ? "small" : "medium"} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {isLogin && (
          <Typography
            variant="body2"
            color="error"
            sx={{ alignSelf: "flex-end", cursor: "pointer" }}
            onClick={() => navigate("/auth/email")}
          >
            Forgot Password?
          </Typography>
        )}
        {loading ? (
          <LoadingBtn />
        ) : (
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size={isPhone ? "small" : "medium"}
            color="error"
            startIcon={
              <LoginRoundedIcon fontSize={isPhone ? "small" : "medium"} />
            }
            sx={{ mt: 2 }}
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </Button>
        )}
        <Typography variant="body2" alignSelf="center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Typography
            component="span"
            color="primary"
            sx={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() =>
              navigate(
                isLogin
                  ? changePage("/auth/signup")
                  : changePage("/auth/signin")
              )
            }
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </Typography>
        </Typography>
      </Stack>
    </Card>
  );
};
