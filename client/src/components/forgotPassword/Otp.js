import React from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  OutlinedInput,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Otp() {
  const params = useParams();
  const navigate = useNavigate();
  const phone = useMediaQuery("(max-width:800px)");
  const formik = useFormik({
    initialValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
    },
    onSubmit: (values) => submitOtp(values),
    validationSchema: yup.object({
      otp1: yup
        .string()
        .max(1, "You can't enter all numbers in one input!")
        .required("OTP is required!"),
      otp2: yup
        .string()
        .max(1, "You can't enter all numbers in one input!")
        .required("OTP is required!"),
      otp3: yup
        .string()
        .max(1, "You can't enter all numbers in one input!")
        .required("OTP is required!"),
      otp4: yup
        .string()
        .max(1, "You can't enter all numbers in one input!")
        .required("OTP is required!"),
    }),
  });
  let otp = "";
  async function submitOtp(values) {
    const formdata = new FormData();
    for (let value in values) {
      otp += values[value];
    }
    formdata.append("otp", otp);
    await axios({
      method: "post",
      url: `http://localhost:8000/forgot-password/users/${params.id}`,
      data: formdata,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) =>
        navigate(`/forgot-password/users/${res.data._id}/reset-password`)
      )
      .catch((err) => console.log(err.response));
  }
  return (
    <Box
      sx={{
        width: "100%",
        mt: 5,
        mb: 7,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          width: phone ? 300 : 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          p: 4,
        }}
      >
        <Box
          component="img"
          width={200}
          height={200}
          borderRadius="50%"
          src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?w=740&t=st=1694384677~exp=1694385277~hmac=3bbdbd87910ce24b8c82a74eed874e6645f1fba86c57c91a6f48c897a9f2e4c7"
        />
        <Typography mb={1} variant="h5">
          OTP Verification
        </Typography>
        <Typography mb={3} variant="caption">
          Enter your OTP here
        </Typography>
        <Grid width={"80%"} container mb={3} spacing={2}>
          <Grid item xs={3}>
            <OutlinedInput
              name="otp1"
              value={formik.values.otp1}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.otp1 && formik.errors.otp1)}
            />
            <Typography variant="caption" color="error">
              {formik.errors.otp1}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <OutlinedInput
              name="otp2"
              value={formik.values.otp2}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <OutlinedInput
              name="otp3"
              value={formik.values.otp3}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <OutlinedInput
              name="otp4"
              value={formik.values.otp4}
              onChange={formik.handleChange}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ width: "80%" }}>
          Verify
        </Button>
      </Card>
    </Box>
  );
}

export default Otp;
