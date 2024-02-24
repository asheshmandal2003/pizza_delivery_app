import { useState } from "react";
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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const params = useParams();
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState(() => false);
  const [disable, setDisable] = useState(() => false);
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
        .oneOf([yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm your password!"),
    }),
  });
  async function resetPassword(values) {
    setDisable(true);
    const formdata = new FormData();
    formdata.append("confirmPassword", values["confirmPassword"]);
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
    setDisable(false);
  }
  return (
    <Box
      width="100%"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Card
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          width: 350,
          mt: 5,
          p: 4,
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
          <img
            src="/images/password.svg"
            alt="reset-password"
            width={100}
            height={100}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Reset Password</Typography>
            <Typography variant="caption" color="text.secondary">
              Enter your new password here
            </Typography>
          </div>
          <TextField
            autoFocus
            fullWidth
            variant="filled"
            name="newPassword"
            id="newPassword"
            label="New Password"
            placeholder="Enter the new password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              Boolean(formik.touched.newPassword) &&
              Boolean(formik.errors.newPassword)
            }
            helperText={
              Boolean(formik.touched.newPassword) && formik.errors.newPassword
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

          <TextField
            fullWidth
            variant="filled"
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm Password"
            placeholder="Re enter the new password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              Boolean(formik.touched.confirmPassword) &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              Boolean(formik.touched.confirmPassword) &&
              formik.errors.confirmPassword
            }
            type={visibility ? "text" : "password"}
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            color="success"
            disabled={disable}
          >
            {disable ? "Updating..." : "Update"}
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}

export default ResetPassword;
