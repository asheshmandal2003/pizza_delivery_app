import {
  Box,
  Button,
  Card,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function Otp() {
  const [disable, setDisable] = useState(() => false);
  const params = useParams();
  const navigate = useNavigate();
  const phone = useMediaQuery("(max-width:500px)");
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    onSubmit: submitOtp,
    validationSchema: yup.object({
      otp: yup
        .string()
        .min(4, "OTP must contain 4 digits!")
        .max(4, "OTP must contain 4 digits!")
        .required("OTP is required!"),
    }),
  });

  async function submitOtp() {
    setDisable(true);
    const formdata = new FormData();
    formdata.append("otp", formik.values.otp);
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/forgot-password/users/${params.id}`,
      data: formdata,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) =>
        navigate(`/forgot-password/users/${res.data._id}/reset-password`)
      )
      .catch((err) => console.log(err.response));
    setDisable(false);
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
          width: phone ? "80%" : 350,
          p: phone ? 2 : 4,
        }}
      >
        <Stack
          width="100%"
          spacing={3}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src="/images/otp.svg" alt="OTP" width={100} height={100} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">OTP Verification</Typography>
            <Typography variant="caption" color="text.secondary">
              Enter the 4 digits OTP
            </Typography>
          </div>
          <TextField
            autoFocus
            fullWidth
            size="small"
            name="otp"
            id="otp"
            label="OTP"
            placeholder="XXXX"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.otp) && Boolean(formik.touched.otp)}
            helperText={Boolean(formik.touched.otp) && formik.errors.otp}
          />
          <Button
            fullWidth
            type="submit"
            disabled={disable}
            variant="contained"
            color="success"
            size={phone ? "small" : "medium"}
          >
            {disable ? "Verifying..." : "Verify"}
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}

export default Otp;
