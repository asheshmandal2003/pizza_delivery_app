import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNotification } from "../../context/NotificationProvider";

function Email() {
  const [disable, setDisable] = useState(() => false);
  const phone = useMediaQuery("(max-width:742px)");
  const notify = useNotification();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => checkEmail(values),
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid Email!")
        .required("Email is required!"),
    }),
  });
  async function checkEmail(values) {
    setDisable(true);
    const formdata = new FormData();
    formdata.append("email", values.email);
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/forgot-password`,
      data: formdata,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        notify(res.data.message, "success");
      })
      .catch((err) => notify(err.response.data.message, "error"))
      .finally(() => setDisable(false));
  }
  return (
    <Box
      width="100%"
      mt={5}
      mb={7}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Card
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          width: phone ? "76%" : 350,
          height: 550,
          p: phone ? 3 : 4,
        }}
      >
        <Stack
          spacing={3}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src="/images/email.svg"
            alt="email-verification"
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
            <Typography variant="h6">Find your email</Typography>
            <Typography variant="caption" color="text.secondary">
              Enter your registered email
            </Typography>
          </div>
          <TextField
            autoFocus
            fullWidth
            name="email"
            id="email"
            label="Email"
            type="email"
            placeholder="john@example.com"
            size={phone ? "small" : "medium"}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              Boolean(formik.touched.email) && Boolean(formik.errors.email)
            }
            helperText={Boolean(formik.touched.email) && formik.errors.email}
          />
          <Button
            variant="contained"
            type="submit"
            size={phone ? "small" : "medium"}
            disabled={disable}
            sx={{ alignSelf: "flex-end" }}
          >
            {disable ? <CircularProgress size={20} /> : "Next"}
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}

export default Email;
