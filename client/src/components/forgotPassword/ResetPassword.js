import { useState } from "react";
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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const params = useParams();
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState(false);
  const handleVisibility = () => {
    setVisibility(!visibility);
  };
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: (values) => resetPassword(values),
    validationSchema: yup.object({
      newPassword: yup
        .string()
        .min(8, "Password must contain minimum 8 characters!")
        .required("Password is required!"),
      confirmPassword: yup
        .string()
        .min(8, "Password must contain minimum 8 characters!")
        .required("Password is required!"),
    }),
  });
  async function resetPassword(values) {
    const formdata = new FormData();
    formdata.append("confirmPassword", values["confirmPassword"]);
    // for (let value in values) {
    //   console.log(values[value]);
    // }
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/forgot-password/users/${params.id}/reset-password`,
      data: formdata,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => navigate("/auth/signin"))
      .catch((err) => console.log(err.response));
  }
  return (
    <Box
      height="120vh"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Card
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          width: "25rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          p: 4,
        }}
      >
        <Box
          component="img"
          src="https://img.freepik.com/premium-vector/password-reset-icon-flat-vector-design_116137-4571.jpg?w=740"
          width={200}
          height={200}
          borderRadius="50%"
        />
        <Typography variant="h5" mb={1}>
          Reset Password
        </Typography>
        <Typography variant="caption" mb={3}>
          Enter your new password here
        </Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>New Password</InputLabel>
          <OutlinedInput
            autoFocus
            fullWidth
            label="New Password"
            name="newPassword"
            type={visibility ? "text" : "password"}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(
              formik.touched.newPassword && formik.errors.newPassword
            )}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleVisibility}>
                  {visibility ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Typography variant="caption" color="error" mt={1}>
            {formik.errors.newPassword}
          </Typography>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Confirm Password</InputLabel>
          <OutlinedInput
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type={visibility ? "text" : "password"}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(
              formik.touched.newPassword && formik.errors.confirmPassword
            )}
          />
          <Typography variant="caption" color="error" mt={1}>
            {formik.errors.confirmPassword}
          </Typography>
        </FormControl>
        <Button variant="contained" type="submit" fullWidth>
          Update
        </Button>
      </Card>
    </Box>
  );
}

export default ResetPassword;
