import React from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Email() {
  const phone = useMediaQuery("(max-width:800px)");
  const navigate = useNavigate();
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
    const formdata = new FormData();
    formdata.append("email", values.email);
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/forgot-password`,
      data: formdata,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => navigate(`/forgot-password/users/${res.data._id}`))
      .catch((err) => console.log(err.response));
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
          width: phone ? 300 : 400,
          height: 600,
          p: 4,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          component="img"
          width={200}
          height={200}
          src="https://img.freepik.com/premium-vector/email-messaging-email-marketing-campaign_183665-8.jpg?w=740"
          sx={{ borderRadius: "50%" }}
        />
        <Typography variant="h5" mb={1}>
          Find your email
        </Typography>
        <Typography mb={3}>Enter your recovery email</Typography>
        <FormControl sx={{ mb: 3, width: "100%" }}>
          <InputLabel>Email</InputLabel>
          <OutlinedInput
            fullWidth
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            label="Email"
            error={formik.touched.email && formik.errors.email}
          />
          {formik.touched.email && (
            <Typography mt={1} color="error" variant="caption">
              {formik.errors.email}
            </Typography>
          )}
        </FormControl>
        <Box width="100%" sx={{ display: "flex", justifyContent: "end" }}>
          <Button variant="contained" type="submit">
            Next
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default Email;
