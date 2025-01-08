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
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationProvider";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  if (!token) {
    navigate("/auth");
  }
  const phone = useMediaQuery("(max-width:600px)");
  const [visibility, setVisibility] = useState(() => false);
  const [disable, setDisable] = useState(() => false);
  const notify = useNotification();

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
    formdata.append("token", token);
    formdata.append("confirmPassword", values["confirmPassword"]);
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/forgot-password/users/${params.id}/reset-password`,
      data: formdata,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        notify(res.data.message, "success");
        navigate("/auth");
      })
      .catch((err) => notify(err.response.data.message, "error"))
      .finally(() => setDisable(false));
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
          width: phone ? "76%" : 350,
          my: 5,
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
          <img
            src="/images/password.svg"
            alt="reset-password"
            width={80}
            height={80}
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
            size={phone ? "small" : "medium"}
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
            size={phone ? "small" : "medium"}
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
            size={phone ? "small" : "medium"}
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
